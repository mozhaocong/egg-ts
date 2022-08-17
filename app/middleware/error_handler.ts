import { returnFormat } from '../core/Controller'

export default () => {
	return async function errorHandler(ctx, next) {
		try {
			await next()
		} catch (err) {
			if (errFilter(err, ctx)) {
				return
			}
			// 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
			ctx.app.emit('error', err, ctx)

			const status = err.status || 500
			// 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
			const error = status === 500 && ctx.app.config.env === 'prod' ? 'Internal Server Error' : err.message

			// 从 error 对象上读出各个属性，设置到响应中
			ctx.body = { error }
			if (status === 422) {
				ctx.body.detail = err.errors
			}
			ctx.status = status
		}
	}
}

function errFilter(err, ctx) {
	const { message, name = '' } = err
	switch (name) {
		case 'JsonWebTokenError':
			return JsonWebTokenError(message, ctx)
	}
	return false
}

function JsonWebTokenError(message, ctx) {
	console.log('message', message)
	ctx.status = 200
	ctx.body = returnFormat({
		code: 402,
		data: null,
		msg: message
	})
	return true
}
