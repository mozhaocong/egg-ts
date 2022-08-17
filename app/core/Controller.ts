import { Controller } from 'egg'
import { searchValidate, setSearchRule } from '../utils/model/business'

export default class BaseController extends Controller {
	searchValidate = searchValidate
	setSearchRule = setSearchRule
	success = (data) => {
		//成功返回
		this.ctx.body = {
			code: 0,
			data,
			msg: '成功'
		}
	}

	notFound = (msg = 'not found', code = 402) => {
		//失败返回
		this.ctx.body = {
			code: code,
			data: null,
			msg: msg
		}
	}
}
