import BaseService from '../core/Service'

export default class UserService extends BaseService {
	appModel = this.app.model.User
	findParams = async (findSearchParamsRule) => {
		const { ctx, modelFindAll, getDefaultPaginationData, getParamsRuleData } = this
		const { query } = ctx.request
		const paginationData = getDefaultPaginationData(query)
		const data = getParamsRuleData(query, findSearchParamsRule)
		const returnData = await modelFindAll(
			this.app.model.User,
			{
				where: { ...data },
				include: {
					model: this.ctx.model.Role,
					as: 'roleList'
				}
			},
			paginationData
		)
		// const returnData = this.app.model.User.findAll({
		// 	// attributes: { exclude: ['age'] }
		// 	include: {
		// 		model: this.ctx.model.Role,
		// 		as: 'roleList'
		// 	}
		// 	// raw: true
		// })
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

	update = async () => {
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

	async destroy() {
		const { ctx, modelAssociationDestroy } = this
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
		return await modelAssociationDestroy(config)
	}

	async create1() {
		const { ctx } = this
		const { body } = ctx.request
		console.log('body', body)
		const createData = body
		const user = await this.app.model.User.create(createData, {
			include: [{ association: this.app.model.User.Role, as: 'roleList' }]
		})
		return user
	}
	create = async () => {
		const { ctx, modelAssociationCreate } = this
		const { body } = ctx.request
		console.log('includeAssociation', this.app.model.User.Role)
		const config = {
			main: { model: this.app.model.User, key: 'id', data: body },
			association: [
				{
					includeAssociation: this.app.model.User.Role,
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
		return await modelAssociationCreate(config)
	}
}
