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
	console.log('errFilterName', name)
	// console.trace('errFilterMessage', message)
	console.log('errFilterErr', err.original)
	switch (name) {
		case 'JsonWebTokenError':
			return JsonWebTokenError(message, ctx)
		case 'newThrow':
			return newThrowError(message, ctx)
		case 'SequelizeUniqueConstraintError':
			return SequelizeUniqueConstraintError(err, ctx)
	}
	return false
}

function SequelizeUniqueConstraintError(err, ctx) {
	const { sqlMessage = '' } = err.original
	ctx.status = 200
	ctx.body = returnFormat({
		code: 402,
		data: null,
		msg: sqlMessage
	})
	return true
}

function JsonWebTokenError(message, ctx) {
	ctx.status = 200
	ctx.body = returnFormat({
		code: 402,
		data: null,
		msg: message
	})
	return true
}
function newThrowError(message, ctx) {
	ctx.status = 200
	ctx.body = returnFormat({
		code: 402,
		data: null,
		msg: message
	})
	return true
}
