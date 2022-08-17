import { objectRepeatObject } from '../public/data'

export function setSearchRule(item) {
	const data = {}
	for (const key in item) {
		data[key] = ruleType(item[key])
	}
	return data
}
function ruleType(item: any) {
	return { searchReq: false, ...item, required: false, defType: item.type, type: 'searchString' }
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

export function getDefaultPaginationData(query, defData = {}) {
	const data = { ...defaultPaginationData, ...defData }
	objectRepeatObject(query, defaultPaginationRule, (key, a) => {
		data[key] = a
	})
	return data
}

export async function modelFindAll(item: any, config = {}, paginationData = { page: 1, size: 10 }, isCount = true) {
	const offset = (paginationData.page * 1 - 1 ?? 0) * (paginationData.size * 1)
	console.log('offset', offset)
	const data = await item.findAll({
		offset: offset,
		limit: paginationData.size * 1,
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
		pagination: { count: count * 1, page: paginationData.page * 1, size: paginationData.size * 1 }
	}
}

export function getParamsRuleData(data = {}, paramsRuleData = {}) {
	const item = {}
	objectRepeatObject(data, paramsRuleData, (key, a) => {
		item[key] = a
	})
	return item
}

export async function simpleParamsRuleModelFindAll({ that, paramsRule = {}, model, findData = {} }) {
	const { ctx } = that
	const { query } = ctx.request
	const paginationData = getDefaultPaginationData(query)
	const data = getParamsRuleData(query, paramsRule)
	const returnData = await modelFindAll(model, { where: { ...data, ...findData } }, paginationData)
	return returnData
}
