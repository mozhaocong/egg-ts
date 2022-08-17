export default () => {
	return async function auth(ctx, next) {
		const { request, app, originalUrl } = ctx
		const { token } = request.header
		const apiUrl = originalUrl.split('?')[0]
		const whitelist = ['/admin/login']
		if (!whitelist.includes(apiUrl)) {
			const user = app.jwt.verify(token, app.config.jwt.secret)
			console.log(user)
		}
		await next()
	}
}
