import BaseController from '../core/Base'
import { pick } from 'ramda'
export const findParamsRule = {
	// id: { type: 'number', required: false },
	name: { type: 'string', required: true, searchReq: true },
	age: { type: 'number', required: false, searchReq: false },
	updated_at: { type: 'date', required: false }
}

export const searchDefData1 = {
	page: { type: 'number', required: false },
	size: { type: 'number', required: false }
}

function setSearchRule(item) {
	const data = {}
	for (const key in item) {
		data[key] = ruleType(item[key])
	}
	return data
}

function ruleType(item: any) {
	const data = { searchReq: false, ...item, required: false, defType: item.type, type: 'searchString' }
	return data
}

const searchList = ['name', 'age', 'updated_at']

export const searchDefData = setSearchRule(searchDefData1)

export const findSearchParamsRule = setSearchRule(pick(searchList, findParamsRule))

export default class HomeController extends BaseController {
	public async findAll() {
		const { ctx, success } = this
		const data = await ctx.service.mySql.findAll()
		success(data)
	}
	public async findParams() {
		const { ctx, success } = this
		ctx.validate(findSearchParamsRule, ctx.request.query)
		ctx.validate(searchDefData, ctx.request.query)
		const data = await ctx.service.mySql.findParams()
		success(data)
	}

	public async create() {
		const { ctx, success } = this
		ctx.validate(findParamsRule, ctx.request.body)
		const data = await ctx.service.mySql.create()
		success(data)
	}
}
