import BaseController from '../core/Controller'

export const findParamsRule = {
	id: { type: 'string', required: false },
	groupName: { type: 'string', required: false }
}

export default class HomeController extends BaseController {
	searchDataRule = findParamsRule
	findParamsRule = findParamsRule
	serviceModel = this.ctx.service.group
}
