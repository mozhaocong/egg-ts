import BaseController from '../core/Controller'

export const findParamsRule = {
	id: { type: 'string', required: false },
	groupName: { type: 'string', required: false }
}

export default class HomeController extends BaseController {
	public async findAll() {
		const { ctx, success } = this
		const data = await ctx.service.group.findAll()
		success(data)
	}
	public async findParams() {
		const { ctx, success, searchValidate, setSearchRule } = this
		searchValidate(ctx, findParamsRule)
		const data = await ctx.service.group.findParams(setSearchRule(findParamsRule))
		success(data)
	}

	public async create() {
		const { ctx, success } = this
		ctx.validate(findParamsRule, ctx.request.body)
		const data = await ctx.service.group.create(findParamsRule)
		success(data)
	}
}
