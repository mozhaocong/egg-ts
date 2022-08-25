import BaseController from '../core/Controller'

export const findParamsRule = {
	pId: { type: 'number', required: false },
	groupName: { type: 'string', required: true }
}
const searchDataRule = {
	id: { type: 'number', required: false },
	...findParamsRule
}

export default class HomeController extends BaseController {
	searchDataRule = searchDataRule
	findParamsRule = findParamsRule
	serviceModel = this.ctx.service.group
}
