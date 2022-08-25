import { Controller } from 'egg'
import { searchValidate, setSearchRule } from '../utils/model/business'
import { isTrue } from '../utils'

export function returnFormat({ msg = '', code = 0, data = null }) {
	return { code: code, data: data, msg: msg }
}

export default class BaseController extends Controller {
	searchValidate = searchValidate
	setSearchRule = setSearchRule
	searchDataRule: ObjectMap = {}
	findParamsRule: ObjectMap = {}
	updateDataRule: ObjectMap = {}
	destroyParamsRule: ObjectMap = {}
	serviceModel: any = {}
	public async findParams() {
		const { ctx, success, searchValidate, setSearchRule, searchDataRule, serviceModel, notFound } = this
		searchValidate(ctx, this.searchDataRule)
		if (!isTrue(serviceModel)) {
			notFound('serviceModel 不能为空')
		}
		const data = await serviceModel?.findParams(setSearchRule(searchDataRule))
		success(data)
	}

	public async update() {
		const { ctx, success, notFound, serviceModel, updateDataRule } = this
		if (!isTrue(updateDataRule)) {
			notFound('findParamsRule 不能为空')
		}
		if (!isTrue(serviceModel)) {
			notFound('serviceModel 不能为空')
		}
		ctx.validate(updateDataRule, ctx.request.body)
		const data = await serviceModel?.update(updateDataRule)
		success(data)
	}

	public async create() {
		const { ctx, success, notFound, serviceModel, findParamsRule } = this
		if (!isTrue(findParamsRule)) {
			notFound('findParamsRule 不能为空')
		}
		if (!isTrue(serviceModel)) {
			notFound('serviceModel 不能为空')
		}
		ctx.validate(findParamsRule, ctx.request.body)
		const data = await serviceModel?.create(findParamsRule)
		success(data)
	}

	public async destroy() {
		const { ctx, success, notFound, serviceModel, destroyParamsRule } = this
		if (!isTrue(destroyParamsRule)) {
			notFound('destroyParamsRule 不能为空')
		}
		if (!isTrue(serviceModel)) {
			notFound('serviceModel 不能为空')
		}
		ctx.validate(destroyParamsRule, ctx.request.body)
		const data = await serviceModel?.destroy(destroyParamsRule)
		success(data)
	}

	public async findAll() {
		const { success, serviceModel, notFound } = this
		if (!isTrue(serviceModel)) {
			notFound('serviceModel 不能为空')
		}
		const data = await serviceModel?.findAll()
		success(data)
	}

	success = (data) => {
		//成功返回
		this.ctx.body = returnFormat({
			code: 0,
			data,
			msg: '成功'
		})
	}

	notFound = (msg = 'not found', code = 402) => {
		//失败返回
		this.ctx.body = returnFormat({
			code: code,
			data: null,
			msg: msg
		})
	}
}
