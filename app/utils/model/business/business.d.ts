type association = {
	// 要关联表的Model
	model: any
	// 要关联表的key值
	key: string
	// 关联表的Model
	associationModel: any
	// 关联表里的主表key
	foreignKey: string
	// 关联表里的要关联表的key
	otherKey: string
	// 关联表里的主表的别名
	as: string
	// 是否调用关联表删除操作
	isAssociationModelDestroy?: boolean
	// create时的新建关联 include 中的 Association
	includeAssociation: any
}

type moduleAssociationOperateAssociationConfig = Pick<
	association,
	'model' | 'foreignKey' | 'otherKey' | 'key' | 'associationModel' | 'isAssociationModelDestroy'
>

type moduleAssociationOperateConfig = {
	// 获取app和ctx
	that: any
	// 事务方法
	transaction: any
	// 要关联表的添加数组
	addList: any[]
	// 主表配置
	mainConfig: { key: string; data: ObjectMap }
	// 关联数组,通过主表 data的别名获取 data[as]
	bulkCreateList: any[]
}
type modelAssociationMethod = {
	// 操作主表的配置
	main: { model: any; key: string; data: ObjectMap }
	// 关联操作的关联表和要关联的数组配置
	association: association[]
	// 获取app和ctx
	that: any
}

interface modelAssociationUpdate extends modelAssociationMethod {
	association: Omit<association, 'includeAssociation'>[]
}

type modelAssociationCreate = modelAssociationMethod
