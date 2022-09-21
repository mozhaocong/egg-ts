import BaseService from '../core/Service'

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
}
