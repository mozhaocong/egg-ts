import { objectRepeatObject } from '../public/data'
import { isTrue } from '../public/typeJudgment'

export function setSearchRule(item) {
	const data = {}
	for (const key in item) {
		data[key] = ruleType(item[key])
	}
	return data
}
function ruleType(item: any) {
	return { searchRequired: false, ...item, required: false, defType: item.type, type: 'searchString' }
}

export type paginationDataType = {
	page: number
	size: number
}

export const defaultPaginationRule = {
	page: { type: 'number', required: false },
	size: { type: 'number', required: false }
}

const defaultPaginationData = { page: 1, size: 10 }

export function searchValidate(ctx: any, data) {
	const paginationDataRule = setSearchRule(defaultPaginationRule)
	const searchDataRule = setSearchRule(data)
	ctx.validate(paginationDataRule, ctx.request.query)
	ctx.validate(searchDataRule, ctx.request.query)
}

export function getDefaultPaginationData(query, defData = {}): { page: number; size: number } {
	const data = { ...defaultPaginationData, ...defData }
	objectRepeatObject(query, defaultPaginationRule, (key, a) => {
		data[key] = a * 1
	})
	return data
}

export async function modelFindAll(item: any, config = {}, paginationData = defaultPaginationData, isCount = true) {
	const offset = (paginationData.page - 1 ?? 0) * paginationData.size
	console.log('config', config)
	const data = await item.findAll({
		offset: offset,
		limit: paginationData.size,
		...config
	})
	let count = 0
	if (isCount) {
		count = await item.count({
			...config
		})
	}
	return {
		list: data,
		pagination: { count: count, page: paginationData.page, size: paginationData.size }
	}
}

// 获取分页查询参数
export function getFindAllCountData(config = {}, paginationData = defaultPaginationData): ObjectMap {
	const offset = (paginationData.page - 1 ?? 0) * paginationData.size
	return {
		offset: offset,
		limit: paginationData.size,
		...config
	}
}

export function getParamsRuleData(data = {}, paramsRuleData = {}): ObjectMap {
	const item = {}
	objectRepeatObject(data, paramsRuleData, (key, a) => {
		item[key] = a
	})
	return item
}

export async function simpleParamsRuleModelFindAll({ that, paramsRule = {}, model, findAllConfig = {} }) {
	const { ctx } = that
	const { query } = ctx.request
	const paginationData = getDefaultPaginationData(query)
	const data = getParamsRuleData(query, paramsRule)
	return await modelFindAll(model, { where: { ...data }, ...findAllConfig }, paginationData)
}

type association = {
	model: any
	key: string
	associationModel: any
	foreignKey: string
	otherKey: string
	as: string
}

export type modelAssociationUpdate = {
	main: { model: any; key: string; data: ObjectMap }
	association: association[]
	that: any
}

export async function modelAssociationUpdate(config: modelAssociationUpdate) {
	// const config = {
	// 	main: { model: null, key: 'id', data: {} },
	// 	association: [
	// 		{ model: null, key: 'id', associationModel: null, foreignKey: 'userId', otherKey: 'roleId', as: 'roleList' }
	// 	]
	// }
	const { data = {} } = config.main
	const { app, ctx } = config.that
	const paramsData = data
	const mainModel: any = config.main.model
	const transaction = await ctx.model.transaction()
	try {
		const { association } = config
		const mainKey = config.main.key
		for (const res of association) {
			// 另外一个主表
			const attachedKey = res.key
			const attachedModel: any = res.model
			const associationModel: any = res.associationModel
			const { as, foreignKey, otherKey } = res
			const addList: any[] = []
			const deduplicationList: any[] = []
			let bulkCreateList = paramsData[as]
				.filter((item) => {
					if (!isTrue(item[attachedKey])) {
						addList.push(item)
						return false
					}
					if (deduplicationList.includes(item[attachedKey])) {
						return false
					}
					deduplicationList.push(item[attachedKey])
					return true
				})
				.map((item) => {
					return { [foreignKey]: paramsData[mainKey], [otherKey]: item[attachedKey] }
				})
			const { Op } = app.Sequelize
			if (isTrue(addList)) {
				const addListData = await attachedModel.bulkCreate(addList, { transaction })
				const addBulkCreateList = addListData.map((item) => {
					return { [foreignKey]: paramsData[mainKey], [otherKey]: item[attachedKey] }
				})
				bulkCreateList = [...bulkCreateList, ...addBulkCreateList]
			}
			console.log('bulkCreateList', bulkCreateList, attachedKey)
			const bulkCreateListMark = bulkCreateList.map((item) => {
				return item[otherKey]
			})

			// 获取从表需要更新的关联表的数据
			const roleList = await attachedModel.findAll({
				where: {
					[attachedKey]: bulkCreateListMark
				}
			})
			// 判断更新的关联表和从表的数据一致不
			if (roleList.length !== bulkCreateListMark.length) {
				console.trace('判断更新的关联表和从表的数据一致不')
				return false
			}

			// 删除除了要更新的与主表关联ID的其他数据
			await associationModel.destroy({
				where: { [foreignKey]: paramsData[mainKey], [Op.not]: [{ [otherKey]: bulkCreateListMark }] },
				transaction
			})
			// 查询与主表关联Id的数据
			const associationData = await associationModel.findAll({
				where: { [foreignKey]: paramsData[mainKey] },
				transaction
			})
			// 生成关联表的从表的ID
			const associationListMark = associationData.map((item) => {
				return item[otherKey]
			})
			// 过滤出要新增关联表的从表数据
			const filterList = bulkCreateList.filter((item) => {
				return !associationListMark.includes(item[otherKey])
			})
			// 批量创建关联表的新关联关系
			await associationModel.bulkCreate(filterList, { transaction })
		}
		const user = await mainModel.update(paramsData, {
			where: { [mainKey]: paramsData[mainKey] },
			transaction
		})
		await transaction.commit()
		return user
	} catch (e) {
		console.log('e', e)
		await transaction.rollback()
		return false
	}
}
