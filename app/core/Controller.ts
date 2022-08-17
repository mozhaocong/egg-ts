import { Controller } from 'egg'
import { searchValidate, setSearchRule } from '../utils/model/business'

export function returnFormat({ msg = '', code = 0, data = null }) {
	return { code: code, data: data, msg: msg }
}

export default class BaseController extends Controller {
	searchValidate = searchValidate
	setSearchRule = setSearchRule
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
