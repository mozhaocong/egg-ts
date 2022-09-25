import BaseController from '../core/Controller'

const defaultParamsRule = {
	pId: { type: 'number', required: false },
	groupName: { type: 'string', required: true }
}

export const findParamsRule = {
	...defaultParamsRule,
	pLevel: { type: 'string', required: true }
}
const searchDataRule = {
	id: { type: 'number', required: false },
	...defaultParamsRule
}
const updateDataRule = {
	id: { type: 'number', required: true },
	level: { type: 'string', required: true },
	...defaultParamsRule
}
const destroyParamsRule = {
	id: { type: 'number', required: true }
}

export default class HomeController extends BaseController {
	searchDataRule = searchDataRule
	updateDataRule = updateDataRule
	destroyParamsRule = destroyParamsRule
	findParamsRule = findParamsRule
	serviceModel = this.ctx.service.group
	public async getGroupTree() {
		const { serviceModel, success } = this
		const data = await serviceModel?.getGroupTree()
		success(data)
	}
}
