// import { Service } from 'egg'
import BaseService from '../core/Service'
import { objectRepeatObject } from '../utils'

export default class UserService extends BaseService {
	async findAll() {
		// 假如 我们拿到用户 id 从数据库获取用户详细信息
		// const user = await this.app.mysql.get('router_management', { name: '111' })

		const user = await this.app.model.User.findAll()
		return { user }
	}
	async findParams(findSearchParamsRule) {
		const { ctx, modelFindAll, getDefaultPaginationData } = this
		const { query } = ctx.request
		const paginationData = getDefaultPaginationData(query)
		const data = {}
		objectRepeatObject(query, findSearchParamsRule, (key, a) => {
			data[key] = a
		})
		console.trace('data', data)
		const returnData = await modelFindAll(this.app.model.User, { where: { ...data } }, paginationData)
		return returnData
	}
	async create(pramsRules) {
		const data = {}
		const { ctx } = this
		const { body } = ctx.request
		objectRepeatObject(body, pramsRules, (key, a) => {
			data[key] = a
		})
		const user = await this.app.model.User.create(data)
		return user
	}
}
