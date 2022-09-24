import BaseController from '../core/Controller'

export const findParamsRule = {
	pId: { type: 'number', required: false },
	groupName: { type: 'string', required: true }
}
const searchDataRule = {
	id: { type: 'number', required: false },
	...findParamsRule
}
const updateDataRule = {
	id: { type: 'number', required: true },
	level: { type: 'string', required: true },
	...findParamsRule
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
