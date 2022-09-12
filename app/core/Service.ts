import { Service } from 'egg'
import {
	modelAssociationCreate,
	modelAssociationUpdate,
	getDefaultPaginationData,
	getFindAllCountData,
	getParamsRuleData,
	modelFindAll,
	paginationDataType,
	simpleParamsRuleModelFindAll,
	modelAssociationDestroy
} from '../utils/model/business'
import { isTrue } from '../utils'

export type customFindParams = {
	paginationData: paginationDataType
	data: ObjectMap
}
export interface customFindParamsMethod {
	(item: customFindParams): Promise<any>
}

export default class BaseService extends Service {
	modelFindAll = modelFindAll
	getDefaultPaginationData = getDefaultPaginationData
	getParamsRuleData = getParamsRuleData
	simpleParamsRuleModelFindAll = simpleParamsRuleModelFindAll
	getFindAllCountData = getFindAllCountData
	customFindParamsMethod: customFindParamsMethod | null = null //自定义 findParams 方法
	setFindAllConfig = {}
	modelAssociationCreate = modelAssociationCreate //关联创建方法
	modelAssociationUpdate = modelAssociationUpdate //关联更新方法
	modelAssociationDestroy = modelAssociationDestroy //关联删除方法
	appModel: ObjectMap = {}

	async findAll() {
		const { appModel } = this
		if (!isTrue(appModel)) {
			throw { message: 'appModel 不能为空', name: 'newThrow' }
		}
		return await appModel.findAll()
	}
	async findParams(findSearchParamsRule) {
		const { simpleParamsRuleModelFindAll, appModel, ctx, customFindParamsMethod, setFindAllConfig } = this
		if (!isTrue(appModel)) {
			throw { message: 'appModel 不能为空', name: 'newThrow' }
		}
		if (isTrue(customFindParamsMethod)) {
			const { query } = ctx.request
			const paginationData = getDefaultPaginationData(query)
			const data = getParamsRuleData(query, findSearchParamsRule)
			// @ts-ignore
			return await customFindParamsMethod({ paginationData, data })
		}
		return await simpleParamsRuleModelFindAll({
			that: this,
			model: appModel,
			paramsRule: findSearchParamsRule,
			findAllConfig: setFindAllConfig
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

	async update(pramsRules) {
		const { ctx, getParamsRuleData, appModel } = this
		if (!isTrue(appModel)) {
			throw { message: 'appModel 不能为空', name: 'newThrow' }
		}
		const { body } = ctx.request
		const data = getParamsRuleData(body, pramsRules) || {}
		const user = await appModel.update(data, { where: { id: data.id } })
		return user
	}
	async destroy(pramsRules) {
		const { ctx, getParamsRuleData, appModel } = this
		if (!isTrue(appModel)) {
			throw { message: 'appModel 不能为空', name: 'newThrow' }
		}
		const { body } = ctx.request
		const data = getParamsRuleData(body, pramsRules)
		console.log('data', data)
		if (!isTrue(data)) {
			throw { message: '删除数据不能为空', name: 'newThrow' }
		}
		const user = await appModel.destroy({ where: { ...data } })
		return user
	}
}
