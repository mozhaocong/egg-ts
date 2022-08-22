import BaseController from '../core/Controller'
import { pick } from 'ramda'

export const findParamsRule = {
	name: { type: 'string', required: true, searchRequired: true },
	age: { type: 'number', required: false, searchRequired: false },
	updated_at: { type: 'date', required: false }
}

const searchData = pick(['name'], findParamsRule)

// export default class HomeController extends BaseController {
// 	public async findAll() {
// 		const { ctx, success } = this
// 		const data = await ctx.service.user.findAll()
// 		success(data)
// 	}
// 	public async findParams() {
// 		const { ctx, success, searchValidate, setSearchRule } = this
// 		searchValidate(ctx, searchData)
// 		const data = await ctx.service.user.findParams(setSearchRule(searchData))
// 		success(data)
// 	}
//
// 	public async create() {
// 		const { ctx, success } = this
// 		ctx.validate(findParamsRule, ctx.request.body)
// 		const data = await ctx.service.user.create(findParamsRule)
// 		success(data)
// 	}
// }

export default class HomeController extends BaseController {
	searchDataRule = searchData
	findParamsRule = findParamsRule
	serviceModel = this.ctx.service.user
}
