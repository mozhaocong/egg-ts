import BaseService from '../core/Service'
import { isTrue, setTreeData } from '../utils'

export default class UserService extends BaseService {
	constructor(ctx) {
		super(ctx)
		const { initConfig, initRedisGroupTree } = this
		initConfig({
			customFindParamsMethod: (item) => {
				const { paginationData } = item
			},
			operationSuccessCallback: {
				method: ['create', 'update', 'destroy'],
				callback: async () => {
					await initRedisGroupTree()
				}
			}
		})
	}
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

	create = async (pramsRules) => {
		const { ctx, getParamsRuleData, appModel, initRedisGroupTree } = this
		if (!isTrue(appModel)) {
			throw { message: 'appModel 不能为空', name: 'newThrow' }
		}
		const { body } = ctx.request
		const data = getParamsRuleData(body, pramsRules)
		const transaction = await ctx.model.transaction()
		try {
			console.log(data)
			const params = { ...data, level: 9999 }
			const createData = await appModel.create(params)
			createData.level = data.pLevel + '-' + createData.id
			await createData.save()
			await transaction.commit()
			await initRedisGroupTree()
			return createData
		} catch (e) {
			await transaction.rollback()
			throw e
		}
	}

	async getGroupTree() {
		const { app } = this
		const data = await app.redis.get('groupTreeData')
		const returnData = data ? JSON.parse(data) : []
		return { list: returnData }
	}

	initRedisGroupTree = async () => {
		const { findAll, app } = this
		const data = await findAll()
		const jsonData = JSON.parse(JSON.stringify(data))
		const treeData = setTreeData({
			data: jsonData
		})
		await app.redis.set('groupTreeData', JSON.stringify(treeData))
	}
}
