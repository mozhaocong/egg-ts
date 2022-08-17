import BaseService from '../core/Service'

export default class AdminService extends BaseService {
	async login() {
		const { ctx, app } = this
		const { body } = ctx.request
		console.log(body)
		const { jwt } = app.config
		const data = { name: 111, id: 22 }
		const token = app.jwt.sign(data, jwt.secret)
		await app.redis.set(`adminUser_${data.id}`, JSON.stringify(data))
		console.log(token)
		return { token }
	}
}
