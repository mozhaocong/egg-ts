export default (app) => {
	const { INTEGER, DATE } = app.Sequelize
	const role = app.model.define('admin-user_to_role', {
		id: { type: INTEGER, primaryKey: true, autoIncrement: true, comment: '用户ID' },
		userId: { type: INTEGER, unique: true, allowNull: false, comment: '用户Id' },
		roleId: { type: INTEGER, unique: true, allowNull: false, comment: '角色Id' },
		createdAt: DATE,
		updatedAt: DATE
	})
	return role
}
