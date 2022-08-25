export default (app) => {
	const { INTEGER, DATE } = app.Sequelize
	const role = app.model.define('admin-user_to_role', {
		id: { type: INTEGER, primaryKey: true, autoIncrement: true, comment: '关联ID' },
		userId: {
			type: INTEGER,
			unique: true,
			allowNull: false,
			comment: '用户Id',
			references: {
				model: 'admin-user',
				key: 'id'
			}
		},
		roleId: {
			type: INTEGER,
			unique: true,
			allowNull: false,
			comment: '角色Id',
			references: {
				model: 'admin-role',
				key: 'id'
			}
		},
		createdAt: DATE,
		updatedAt: DATE
	})
	return role
}
