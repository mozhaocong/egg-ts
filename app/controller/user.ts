import BaseController from '../core/Controller'
import { pick } from 'ramda'

export const findParamsRule = {
	name: { type: 'string', required: true, searchReq: true },
	age: { type: 'number', required: false, searchReq: false },
	updated_at: { type: 'date', required: false }
}

const searchData = pick(['name'], findParamsRule)

export default class HomeController extends BaseController {
	public async findAll() {
		const { ctx, success } = this
		const data = await ctx.service.mySql.findAll()
		success(data)
	}
	public async findParams() {
		const { ctx, success, searchValidate, setSearchRule } = this
		searchValidate(ctx, searchData)

		const data = await ctx.service.mySql.findParams(setSearchRule(searchData))
		success(data)
	}

	public async create() {
		const { ctx, success } = this
		ctx.validate(findParamsRule, ctx.request.body)
		const data = await ctx.service.mySql.create(findParamsRule)
		success(data)
	}
}
