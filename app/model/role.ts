export default (app) => {
	const { INTEGER, DATE, STRING } = app.Sequelize
	const role = app.model.define('admin-role', {
		id: { type: INTEGER, primaryKey: true, autoIncrement: true, comment: '角色ID' },
		roleName: { type: STRING(30), unique: true, allowNull: false, comment: '角色名称' },
		groupId: { type: INTEGER, comment: '关联群组ID' },
		permissionId: { type: INTEGER, comment: '关联权限ID' },
		createdAt: DATE,
		updatedAt: DATE
	})
	role.associate = function () {
		// 一个群组对应多个角色
		app.model.Role.belongsTo(app.model.Group, {
			foreignKey: 'groupId',
			targetKey: 'id',
			as: 'groupData'
		})
	}
	return role
}
