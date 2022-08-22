import BaseService from '../core/Service'

export default class UserService extends BaseService {
	async findAll() {
		const user = await this.app.model.Group.findAll()
		return { user }
	}
	async findParams(findSearchParamsRule) {
		const { simpleParamsRuleModelFindAll } = this
		return await simpleParamsRuleModelFindAll({
			that: this,
			model: this.app.model.Group,
			paramsRule: findSearchParamsRule
		})
	}
	async create(pramsRules) {
		const { ctx, getParamsRuleData } = this
		const { body } = ctx.request
		const data = getParamsRuleData(body, pramsRules)
		const user = await this.app.model.Group.create(data)
		return user
	}
}
