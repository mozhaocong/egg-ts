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

export interface customFindParamsMethod {
	(item: { paginationData: paginationDataType; data: ObjectMap }): Promise<any>
}

export type operationSuccessCallback = {
	method: Array<'findAll' | 'findParams' | 'create' | 'update' | 'destroy'>
	callback: () => Promise<any>
}

export type initConfigType = {
	operationSuccessCallback?: operationSuccessCallback
	customFindParamsMethod?: customFindParamsMethod
}

export default class BaseService extends Service {
	modelFindAll = modelFindAll
	getDefaultPaginationData = getDefaultPaginationData
	getParamsRuleData = getParamsRuleData
	simpleParamsRuleModelFindAll = simpleParamsRuleModelFindAll
	getFindAllCountData = getFindAllCountData
	modelAssociationCreate = modelAssociationCreate //关联创建方法(多对多关系的，有关联表)
	modelAssociationUpdate = modelAssociationUpdate //关联更新方法(多对多关系的，有关联表)
	modelAssociationDestroy = modelAssociationDestroy //关联删除方法(多对多关系的，有关联表)
	appModel: ObjectMap = {}
	setFindParamsConfig = {}
	private operationSuccessCallback: operationSuccessCallback
	private customFindParamsMethod: customFindParamsMethod
	protected initConfig = (item: initConfigType) => {
		const { operationSuccessCallback, customFindParamsMethod } = item
		if (operationSuccessCallback) {
			this.operationSuccessCallback = operationSuccessCallback
		}
		if (customFindParamsMethod) {
			this.customFindParamsMethod = customFindParamsMethod
		}
	}
	protected findAll = async () => {
		const { appModel, operationSuccessCallback } = this
		if (!isTrue(appModel)) {
			throw { message: 'appModel 不能为空', name: 'newThrow' }
		}
		if (isTrue(operationSuccessCallback)) {
			const { method, callback } = operationSuccessCallback
			if (method.includes('findAll')) {
				await callback()
			}
		}
		return await appModel.findAll()
	}
	protected findParams = async (findSearchParamsRule) => {
		const {
			simpleParamsRuleModelFindAll,
			appModel,
			ctx,
			customFindParamsMethod,
			setFindParamsConfig,
			operationSuccessCallback
		} = this
		if (!isTrue(appModel)) {
			throw { message: 'appModel 不能为空', name: 'newThrow' }
		}
		if (customFindParamsMethod && isTrue(customFindParamsMethod)) {
			const { query } = ctx.request
			const paginationData = getDefaultPaginationData(query)
			const data = getParamsRuleData(query, findSearchParamsRule)
			return await customFindParamsMethod({ paginationData, data })
		}
		const returnData = await simpleParamsRuleModelFindAll({
			that: this,
			model: appModel,
			paramsRule: findSearchParamsRule,
			findAllConfig: setFindParamsConfig
		})

		if (isTrue(operationSuccessCallback)) {
			const { method, callback } = operationSuccessCallback
			if (method.includes('findParams')) {
				await callback()
			}
		}
		return returnData
	}
	protected create = async (pramsRules) => {
		const { ctx, getParamsRuleData, appModel, operationSuccessCallback } = this
		if (!isTrue(appModel)) {
			throw { message: 'appModel 不能为空', name: 'newThrow' }
		}
		const { body } = ctx.request
		const data = getParamsRuleData(body, pramsRules)
		const createData = await appModel.create(data)
		if (isTrue(operationSuccessCallback)) {
			const { method, callback } = operationSuccessCallback
			if (method.includes('create')) {
				await callback()
			}
		}
		return createData
	}

	protected update = async (pramsRules) => {
		const { ctx, getParamsRuleData, appModel, operationSuccessCallback } = this
		if (!isTrue(appModel)) {
			throw { message: 'appModel 不能为空', name: 'newThrow' }
		}
		const { body } = ctx.request
		const data = getParamsRuleData(body, pramsRules) || {}
		console.log('data', data)
		const user = await appModel.update(data, { where: { id: data.id } })
		if (isTrue(operationSuccessCallback)) {
			const { method, callback } = operationSuccessCallback
			if (method.includes('update')) {
				await callback()
			}
		}
		return user
	}
	async destroy(pramsRules) {
		const { ctx, getParamsRuleData, appModel, operationSuccessCallback } = this
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
		if (isTrue(operationSuccessCallback)) {
			const { method, callback } = operationSuccessCallback
			if (method.includes('destroy')) {
				await callback()
			}
		}
		return user
	}
}
