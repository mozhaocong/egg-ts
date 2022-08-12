module.exports = (app) => {
	// console.trace('app1', app)
	async function init() {
		const ctx = await app.createAnonymousContext()
		const { validate } = ctx
		console.trace('validate', validate)
	}
	init()
}
