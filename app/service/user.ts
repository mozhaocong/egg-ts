import BaseService from '../core/Service'

// export default class UserService extends BaseService {
// 	async findAll() {
// 		const user = await this.app.model.User.findAll()
// 		return { user }
// 	}
// 	async findParams(findSearchParamsRule) {
// 		// const { ctx, modelFindAll, getDefaultPaginationData, getParamsRuleData } = this
// 		// const { query } = ctx.request
// 		// const paginationData = getDefaultPaginationData(query)
// 		// const data = getParamsRuleData(query, findSearchParamsRule)
// 		// const returnData = await modelFindAll(this.app.model.User, { where: { ...data } }, paginationData)
// 		// return returnData
// 		const { simpleParamsRuleModelFindAll } = this
// 		return await simpleParamsRuleModelFindAll({
// 			that: this,
// 			model: this.app.model.User,
// 			paramsRule: findSearchParamsRule
// 		})
// 	}
// 	async create(pramsRules) {
// 		const { ctx, getParamsRuleData } = this
// 		const { body } = ctx.request
// 		const data = getParamsRuleData(body, pramsRules)
// 		const user = await this.app.model.User.create(data)
// 		return user
// 	}
// }

export default class UserService extends BaseService {
	appModel = this.app.model.User
	async findParams() {
		// const { ctx, modelFindAll, getDefaultPaginationData, getParamsRuleData } = this
		// const { query } = ctx.request
		// const paginationData = getDefaultPaginationData(query)
		// const data = getParamsRuleData(query, findSearchParamsRule)
		// const returnData = await modelFindAll(this.app.model.User, { where: { ...data } }, paginationData)
		const returnData = this.app.model.User.findAll({
			include: {
				model: this.ctx.model.Group,
				as: 'groupList'
			}
			// raw: true
		})
		return returnData
	}
}
