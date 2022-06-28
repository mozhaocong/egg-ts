import { Controller } from 'egg'

const createRule = {
	title: 'string',
	id: 'string'
}

export default class HomeController extends Controller {
	public async index() {
		const { ctx } = this
		ctx.validate(createRule, ctx.request.query)
		ctx.body = await ctx.service.test.sayHi('egg')
	}
}
