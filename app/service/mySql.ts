import BaseService from '../core/Service'

export default class UserService extends BaseService {
	async findAll() {
		// 假如 我们拿到用户 id 从数据库获取用户详细信息
		// const user = await this.app.mysql.get('router_management', { name: '111' })
		const user = await this.app.model.User.findAll()
		return { user }
	}
	async findParams(findSearchParamsRule) {
		// const { ctx, modelFindAll, getDefaultPaginationData, getParamsRuleData } = this
		// const { query } = ctx.request
		// const paginationData = getDefaultPaginationData(query)
		// const data = getParamsRuleData(query, findSearchParamsRule)
		// const returnData = await modelFindAll(this.app.model.User, { where: { ...data } }, paginationData)
		// return returnData

		const { simpleParamsRuleModelFindAll } = this
		return await simpleParamsRuleModelFindAll({
			that: this,
			model: this.app.model.User,
			paramsRule: findSearchParamsRule
		})
	}
	async create(pramsRules) {
		const { ctx, getParamsRuleData } = this
		const { body } = ctx.request
		const data = getParamsRuleData(body, pramsRules)
		console.trace('create data', data)
		const user = await this.app.model.User.create(data)
		return user
	}
}
