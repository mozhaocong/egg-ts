export default (app) => {
	const { STRING, INTEGER, DATE } = app.Sequelize
	const group = app.model.define('admin-group', {
		id: { type: INTEGER, primaryKey: true, autoIncrement: true },
		pId: { type: INTEGER, defaultValue: 0, comment: '上级Id,最高级为0' },
		groupName: { type: STRING(30), unique: true, allowNull: false, comment: '群组名称' },
		level: { type: STRING(30), allowNull: false, comment: '类别' },
		createdAt: DATE,
		updatedAt: DATE
	})

	group.associate = function () {
		// 一个群组对应多个角色
		app.model.Group.hasMany(app.model.Role, {
			foreignKey: 'groupId',
			sourceKey: 'id',
			as: 'roleList'
		})
		// User.Group = app.model.User.hasMany(app.model.Group, {
		// 	foreignKey: 'userId',
		// 	sourceKey: 'groupId'
		// 	// constraints: false
		// 	// as: 'groupList'
		// })
		// app.model.Group.belongsTo(app.model.User, {
		// 	foreignKey: 'userDataId',
		// 	targetKey: 'groupDataId'
		// 	// as: 'groupList'
		// })
	}

	return group
}
