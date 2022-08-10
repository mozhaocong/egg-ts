import BaseController from '../core/Base'
import { pick } from 'ramda'
export const findParamsRule = {
	// id: { type: 'number', required: false },
	name: { type: 'string', required: true },
	age: { type: 'number', required: false }
	// date: { type: 'date', required: false }
}

function setSearchRule(item) {
	const data = {}
	for (const key in item) {
		data[key] = ruleType(item[key])
	}
	return data
}

function ruleType(item: any) {
	const data = { ...item, required: false, defType: item.type }
	switch (item.type) {
		case 'number':
			data.type = 'string'
			break
	}
	return data
}

const searchList = ['name', 'age', 'date']

export const findSearchParamsRule = setSearchRule(pick(searchList, findParamsRule))

export default class HomeController extends BaseController {
	public async findAll() {
		const { ctx, success } = this
		const data = await ctx.service.mySql.findAll()
		success(data)
	}
	public async findParams() {
		const { ctx, success } = this
		console.log('Sequelize1', ctx.Sequelize)
		ctx.validate(findSearchParamsRule, ctx.request.query)
		const data = await ctx.service.mySql.findParams()
		success(data)
	}

	public async create() {
		const { ctx, success } = this
		const { name } = ctx.request.body
		console.log(typeof name)
		console.log('findParamsRule', findParamsRule, ctx.request.body)
		ctx.validate(findParamsRule, ctx.request.body)
		const data = await ctx.service.mySql.create()
		success(data)
	}
}
