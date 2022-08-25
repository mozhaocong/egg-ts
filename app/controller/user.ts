import BaseController from '../core/Controller'

export const findParamsRule = {
	name: { type: 'string', required: true },
	age: { type: 'number', required: false },
	email: { type: 'string', required: false },
	password: { type: 'string', required: false }
}

const searchRule = {
	id: { type: 'number', required: false },
	updatedAt: { type: 'date', required: false },
	createdAt: { type: 'date', required: false }
}

const searchDataRule = { ...findParamsRule, ...searchRule }

export default class HomeController extends BaseController {
	searchDataRule = searchDataRule
	findParamsRule = findParamsRule
	serviceModel = this.ctx.service.user
	destroyParamsRule = { id: { type: 'number', required: true } }
}
