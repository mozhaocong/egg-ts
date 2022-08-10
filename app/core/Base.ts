import { Controller } from 'egg'

export default class BaseController extends Controller {
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
