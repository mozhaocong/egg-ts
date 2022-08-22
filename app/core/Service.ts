import { Service } from 'egg'
import {
	getDefaultPaginationData,
	getParamsRuleData,
	modelFindAll,
	simpleParamsRuleModelFindAll
} from '../utils/model/business'
import { isTrue } from '../utils'

export default class BaseService extends Service {
	modelFindAll = modelFindAll
	getDefaultPaginationData = getDefaultPaginationData
	getParamsRuleData = getParamsRuleData
	simpleParamsRuleModelFindAll = simpleParamsRuleModelFindAll
	appModel: ObjectMap = {}

	async findAll() {
		const { appModel } = this
		if (!isTrue(appModel)) {
			throw { message: 'appModel 不能为空', name: 'newThrow' }
		}
		const user = await appModel.findAll()
		return { user }
	}
	async findParams(findSearchParamsRule) {
		const { simpleParamsRuleModelFindAll, appModel } = this
		if (!isTrue(appModel)) {
			throw { message: 'appModel 不能为空', name: 'newThrow' }
		}
		return await simpleParamsRuleModelFindAll({
			that: this,
			model: appModel,
			paramsRule: findSearchParamsRule
		})
	}
	async create(pramsRules) {
		const { ctx, getParamsRuleData, appModel } = this
		if (!isTrue(appModel)) {
			throw { message: 'appModel 不能为空', name: 'newThrow' }
		}
		const { body } = ctx.request
		const data = getParamsRuleData(body, pramsRules)
		const user = await appModel.create(data)
		return user
	}
}
