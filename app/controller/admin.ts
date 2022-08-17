import BaseController from '../core/Controller'

export default class loginController extends BaseController {
	public async login() {
		const { ctx, success } = this
		const data = await ctx.service.admin.login()
		success(data)
	}
}
