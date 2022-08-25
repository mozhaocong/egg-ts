import { objectRepeatObject } from '../public/data'

export function setSearchRule(item) {
	const data = {}
	for (const key in item) {
		data[key] = ruleType(item[key])
	}
	return data
}
function ruleType(item: any) {
	return { searchRequired: false, ...item, required: false, defType: item.type, type: 'searchString' }
}

export type paginationDataType = {
	page: number
	size: number
}

export const defaultPaginationRule = {
	page: { type: 'number', required: false },
	size: { type: 'number', required: false }
}

const defaultPaginationData = { page: 1, size: 10 }

export function searchValidate(ctx: any, data) {
	const paginationDataRule = setSearchRule(defaultPaginationRule)
	const searchDataRule = setSearchRule(data)
	ctx.validate(paginationDataRule, ctx.request.query)
	ctx.validate(searchDataRule, ctx.request.query)
}

export function getDefaultPaginationData(query, defData = {}): { page: number; size: number } {
	const data = { ...defaultPaginationData, ...defData }
	objectRepeatObject(query, defaultPaginationRule, (key, a) => {
		data[key] = a * 1
	})
	return data
}

export async function modelFindAll(item: any, config = {}, paginationData = defaultPaginationData, isCount = true) {
	const offset = (paginationData.page - 1 ?? 0) * paginationData.size
	console.log('config', config)
	const data = await item.findAll({
		offset: offset,
		limit: paginationData.size,
		...config
	})
	let count = 0
	if (isCount) {
		count = await item.count({
			...config
		})
	}
	return {
		list: data,
		pagination: { count: count, page: paginationData.page, size: paginationData.size }
	}
}

// 获取分页查询参数
export function getFindAllCountData(config = {}, paginationData = defaultPaginationData): ObjectMap {
	const offset = (paginationData.page - 1 ?? 0) * paginationData.size
	return {
		offset: offset,
		limit: paginationData.size,
		...config
	}
}

export function getParamsRuleData(data = {}, paramsRuleData = {}): ObjectMap {
	const item = {}
	objectRepeatObject(data, paramsRuleData, (key, a) => {
		item[key] = a
	})
	return item
}

export async function simpleParamsRuleModelFindAll({ that, paramsRule = {}, model, findAllConfig = {} }) {
	const { ctx } = that
	const { query } = ctx.request
	const paginationData = getDefaultPaginationData(query)
	const data = getParamsRuleData(query, paramsRule)
	return await modelFindAll(model, { where: { ...data }, ...findAllConfig }, paginationData)
}
