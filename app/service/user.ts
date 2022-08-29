import BaseService from '../core/Service'

// export default class UserService extends BaseService {
// 	async findAll() {
// 		const user = await this.app.model.User.findAll()
// 		return { user }
// 	}
// 	async findParams(findSearchParamsRule) {
// 		// const { ctx, modelFindAll, getDefaultPaginationData, getParamsRuleData } = this
// 		// const { query } = ctx.request
// 		// const paginationData = getDefaultPaginationData(query)
// 		// const data = getParamsRuleData(query, findSearchParamsRule)
// 		// const returnData = await modelFindAll(this.app.model.User, { where: { ...data } }, paginationData)
// 		// return returnData
// 		const { simpleParamsRuleModelFindAll } = this
// 		return await simpleParamsRuleModelFindAll({
// 			that: this,
// 			model: this.app.model.User,
// 			paramsRule: findSearchParamsRule
// 		})
// 	}
// 	async create(pramsRules) {
// 		const { ctx, getParamsRuleData } = this
// 		const { body } = ctx.request
// 		const data = getParamsRuleData(body, pramsRules)
// 		const user = await this.app.model.User.create(data)
// 		return user
// 	}
// }

export default class UserService extends BaseService {
	appModel = this.app.model.User
	async findParams() {
		// const { ctx, modelFindAll, getDefaultPaginationData, getParamsRuleData } = this
		// const { query } = ctx.request
		// const paginationData = getDefaultPaginationData(query)
		// const data = getParamsRuleData(query, findSearchParamsRule)
		// const returnData = await modelFindAll(this.app.model.User, { where: { ...data } }, paginationData)
		const returnData = this.app.model.User.findAll({
			// attributes: { exclude: ['age'] }
			include: {
				model: this.ctx.model.Role,
				as: 'roleList'
			}
			// raw: true
		})
		return returnData
	}

	// async update() {
	// 	const { ctx } = this
	// 	const { body } = ctx.request
	// 	const { roleList = [] } = body
	// 	const addList: any[] = []
	// 	let bulkCreateList = roleList
	// 		.filter((item) => {
	// 			if (!isTrue(item.id)) {
	// 				addList.push(item)
	// 				return false
	// 			}
	// 			return true
	// 		})
	// 		.map((item) => {
	// 			return { userId: body.id, roleId: item.id }
	// 		})
	//
	// 	let transaction
	// 	try {
	// 		transaction = await this.ctx.model.transaction()
	// 		const { Op } = this.app.Sequelize
	// 		if (isTrue(addList)) {
	// 			const addListData = await this.app.model.Role.bulkCreate(addList, { transaction })
	// 			const addBulkCreateList = addListData.map((item) => {
	// 				return { userId: body.id, roleId: item.id }
	// 			})
	// 			bulkCreateList = [...bulkCreateList, ...addBulkCreateList]
	// 		}
	// 		const bulkCreateListMark = bulkCreateList.map((item) => {
	// 			return item.roleId
	// 		})
	//
	// 		// 获取从表需要更新的关联表的数据
	// 		const roleList = await this.app.model.Role.findAll({
	// 			where: {
	// 				id: bulkCreateListMark
	// 			}
	// 		})
	// 		// 判断更新的关联表和从表的数据一致不
	// 		if (roleList.length !== bulkCreateListMark.length) {
	// 			return false
	// 		}
	//
	// 		// 删除除了要更新的与主表关联ID的其他数据
	// 		await this.app.model.UserToRole.destroy({
	// 			where: { userId: body.id, [Op.not]: [{ roleId: bulkCreateListMark }] },
	// 			transaction
	// 		})
	// 		// 查询与主表关联Id的数据
	// 		const associationData = await this.app.model.UserToRole.findAll({ where: { userId: body.id }, transaction })
	// 		// 生成关联表的从表的ID
	// 		const associationListMark = associationData.map((item) => {
	// 			return item.roleId
	// 		})
	// 		// 过滤出要新增关联表的从表数据
	// 		const filterList = bulkCreateList.filter((item) => {
	// 			return !associationListMark.includes(item.roleId)
	// 		})
	// 		// 批量创建关联表的新关联关系
	// 		await this.app.model.UserToRole.bulkCreate(filterList, { transaction })
	// 		const user = await this.app.model.User.update(body, { where: { id: body.id }, transaction })
	// 		await transaction.commit()
	// 		return user
	// 	} catch (e) {
	// 		console.log('e', e)
	// 		await transaction.rollback()
	// 		return false
	// 	}
	// }

	// async create(pramsRules) {
	// 	const { ctx, getParamsRuleData } = this
	// 	const { body } = ctx.request
	// 	const data = getParamsRuleData(body, pramsRules)
	// 	const user = await this.app.model.User.create(data)
	// 	// const user = await this.app.model.User.create(body, { include: [{ association: this.app.model.User.Group }] })
	// 	return user
	// }

	// async associationUpdate() {
	// 	const config = {
	// 		main: { model: null, key: 'id', data: {} },
	// 		association: [
	// 			{ model: null, key: 'id', associationModel: null, foreignKey: 'userId', otherKey: 'roleId', as: 'roleList' }
	// 		]
	// 	}
	// 	console.log('config', config)
	//
	// 	const { data = {} } = config.main
	//
	// 	const paramsData = data
	// 	const mainModel: any = config.main.model
	// 	const transaction = await this.ctx.model.transaction()
	// 	try {
	// 		const { association } = config
	// 		const mainKey = config.main.key
	// 		for (const res of association) {
	// 			// 另外一个主表
	// 			const attachedKey = res.key
	// 			const attachedModel: any = res.model
	// 			const associationModel: any = res.associationModel
	// 			const { as, foreignKey, otherKey } = res
	// 			const addList: any[] = []
	// 			let bulkCreateList = paramsData[as]
	// 				.filter((item) => {
	// 					if (!isTrue(item[attachedKey])) {
	// 						addList.push(item)
	// 						return false
	// 					}
	// 					return true
	// 				})
	// 				.map((item) => {
	// 					return { [foreignKey]: paramsData[mainKey], [otherKey]: item[attachedKey] }
	// 				})
	// 			const { Op } = this.app.Sequelize
	// 			if (isTrue(addList)) {
	// 				const addListData = await attachedModel.bulkCreate(addList, { transaction })
	// 				const addBulkCreateList = addListData.map((item) => {
	// 					return { [foreignKey]: paramsData[mainKey], [otherKey]: item[attachedKey] }
	// 				})
	// 				bulkCreateList = [...bulkCreateList, ...addBulkCreateList]
	// 			}
	// 			const bulkCreateListMark = bulkCreateList.map((item) => {
	// 				return item[attachedKey]
	// 			})
	//
	// 			// 获取从表需要更新的关联表的数据
	// 			const roleList = await attachedModel.findAll({
	// 				where: {
	// 					id: bulkCreateListMark
	// 				}
	// 			})
	// 			// 判断更新的关联表和从表的数据一致不
	// 			if (roleList.length !== bulkCreateListMark.length) {
	// 				return false
	// 			}
	//
	// 			// 删除除了要更新的与主表关联ID的其他数据
	// 			await associationModel.destroy({
	// 				where: { [foreignKey]: paramsData[mainKey], [Op.not]: [{ [otherKey]: bulkCreateListMark }] },
	// 				transaction
	// 			})
	// 			// 查询与主表关联Id的数据
	// 			const associationData = await associationModel.findAll({
	// 				where: { [foreignKey]: paramsData[mainKey] },
	// 				transaction
	// 			})
	// 			// 生成关联表的从表的ID
	// 			const associationListMark = associationData.map((item) => {
	// 				return item.roleId
	// 			})
	// 			// 过滤出要新增关联表的从表数据
	// 			const filterList = bulkCreateList.filter((item) => {
	// 				return !associationListMark.includes(item.roleId)
	// 			})
	// 			// 批量创建关联表的新关联关系
	// 			await associationModel.bulkCreate(filterList, { transaction })
	// 		}
	// 		const user = await mainModel.update(paramsData, {
	// 			where: { [mainKey]: paramsData[mainKey] },
	// 			transaction
	// 		})
	// 		await transaction.commit()
	// 		return user
	// 	} catch (e) {
	// 		console.log('e', e)
	// 		await transaction.rollback()
	// 		return false
	// 	}
	// }

	async update() {
		const { ctx, modelAssociationUpdate } = this
		const { body } = ctx.request
		const config = {
			main: { model: this.app.model.User, key: 'id', data: body },
			association: [
				{
					model: this.app.model.Role,
					key: 'id',
					associationModel: this.app.model.UserToRole,
					foreignKey: 'userId',
					otherKey: 'roleId',
					as: 'roleList'
				}
			],
			that: this
		}
		return await modelAssociationUpdate(config)
	}

	async create() {
		const { ctx } = this
		const { body } = ctx.request
		const user = await this.app.model.User.create(body, {
			include: [{ association: this.app.model.User.Role, as: 'roleList' }]
		})
		return user
	}
}
