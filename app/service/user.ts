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
			// attributes: { exclude: ['age'] }
			include: {
				model: this.ctx.model.Role,
				as: 'roleList'
			}
			// raw: true
		})
		return returnData
	}

	// async create(pramsRules) {
	// 	const { ctx, getParamsRuleData } = this
	// 	const { body } = ctx.request
	// 	const data = getParamsRuleData(body, pramsRules)
	// 	const user = await this.app.model.User.create(data)
	// 	// const user = await this.app.model.User.create(body, { include: [{ association: this.app.model.User.Group }] })
	// 	return user
	// }
	async create() {
		const { ctx } = this
		const { body } = ctx.request
		const user = await this.app.model.User.create(body, {
			include: [{ association: this.app.model.User.Role, as: 'roleList' }]
		})
		return user
	}
}
