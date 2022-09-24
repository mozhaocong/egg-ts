import BaseService from '../core/Service'
import { setTreeData } from '../utils'

export default class UserService extends BaseService {
	appModel = this.app.model.Group
	// customFindParamsMethod = async (item: customFindParams) => {
	// 	const { getFindAllCountData } = this
	// 	const { paginationData, data } = item
	// 	const params = getFindAllCountData(data, paginationData)
	// 	return await this.appModel.findAll({
	// 		...params,
	// 		include: {
	// 			model: this.ctx.model.Role,
	// 			as: 'roleList'
	// 		}
	// 	})
	// }

	async getGroupTree() {
		const { app } = this
		const data = await app.redis.get('groupTreeData')
		const returnData = data ? JSON.parse(data) : []
		return { list: returnData }
	}

	async initRedisGroupTree() {
		const { findAll, app } = this
		const data = await findAll()
		const jsonData = JSON.parse(JSON.stringify(data))
		const treeData = setTreeData({
			data: jsonData
		})
		await app.redis.set('groupTreeData', JSON.stringify(treeData))
	}
}
