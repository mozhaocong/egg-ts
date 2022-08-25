import BaseController from '../core/Controller'

export const findParamsRule = {
	roleName: { type: 'string', required: true },
	groupId: { type: 'number', required: false },
	permissionId: { type: 'number', required: false }
}
const searchDataRule = {
	id: { type: 'number', required: false },
	...findParamsRule
}

const updateDataRule = { id: { type: 'number', required: true }, ...findParamsRule }

export default class HomeController extends BaseController {
	searchDataRule = searchDataRule
	findParamsRule = findParamsRule
	updateDataRule = updateDataRule
	serviceModel = this.ctx.service.role
}
