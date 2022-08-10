import { Service } from 'egg'
import { objectRepeatObject } from '../utils'
import { findSearchParamsRule } from '../controller/user'

export default class UserService extends Service {
	async findAll() {
		// 假如 我们拿到用户 id 从数据库获取用户详细信息
		// const user = await this.app.mysql.get('router_management', { name: '111' })

		const user = await this.app.model.User.findAll()
		return { user }
	}
	async findParams() {
		const { ctx } = this
		const { query } = ctx.request
		const data = {}
		objectRepeatObject(query, findSearchParamsRule, (key, a) => {
			data[key] = a
		})
		console.log(data)
		return { ctx }
	}
	async create() {
		const user = await this.app.model.User.create({ name: '张三', age: 20 })
		return user
	}
}
