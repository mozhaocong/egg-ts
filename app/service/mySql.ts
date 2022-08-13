import { Service } from 'egg'
import { objectRepeatObject } from '../utils'
import { findSearchParamsRule } from '../controller/user'

async function modelFindAll(item: any, config = {}, paginationData = { page: 1, size: 10 }, isCount = true) {
	const data = await item.findAll({
		offset: paginationData.page - 1 ?? 0,
		limit: paginationData.size,
		...config
	})
	let count = 0
	if (isCount) {
		count = await item.count({
			...config
		})
	}

	return { list: data, pagination: { count: count } }
}

export default class UserService extends Service {
	async findAll() {
		// 假如 我们拿到用户 id 从数据库获取用户详细信息
		// const user = await this.app.mysql.get('router_management', { name: '111' })

		const user = await this.app.model.User.findAll()
		return { user }
	}
	async findParams() {
		const { ctx } = this
		const { query } = ctx.request
		const data = {}
		const defPaginationData = { page: 1, size: 10 }
		const paginationData: any = {}
		objectRepeatObject(defPaginationData, { ...defPaginationData, ...query }, (key, a, b) => {
			paginationData[key] = b * 1
			return a
		})

		console.log('paginationData', paginationData)
		objectRepeatObject(query, findSearchParamsRule, (key, a) => {
			data[key] = a
		})

		const returnData = await modelFindAll(this.app.model.User, { where: { ...data } }, paginationData)
		return returnData
	}
	async create() {
		const data = {}
		const { ctx } = this
		const { body } = ctx.request
		objectRepeatObject(body, findSearchParamsRule, (key, a) => {
			data[key] = a
		})
		const user = await this.app.model.User.create(data)
		return user
	}
}
