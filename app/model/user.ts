export default (app) => {
	const { STRING, INTEGER, VIRTUAL, DATE } = app.Sequelize
	const user = app.model.define(
		'admin-user',
		{
			id: { type: INTEGER, primaryKey: true, autoIncrement: true, comment: '用户ID' },
			name: { type: STRING(30), primaryKey: true, allowNull: false, unique: true, comment: '用户账号' },
			email: { type: STRING(30), primaryKey: true, unique: true, comment: '邮箱' },
			age: INTEGER,
			password: { type: STRING(30), allowNull: false, defaultValue: '123456', comment: '密码' },
			createdAt: DATE,
			updatedAt: DATE,
			deletedAt: DATE,
			nameEmail: {
				type: VIRTUAL,
				get() {
					// @ts-ignore
					return `${this.name} ${this.email}`
				}
			}
		},
		{
			paranoid: true
		}
	)

	user.associate = function () {
		app.model.User.Role = app.model.User.belongsToMany(app.model.Role, {
			through: app.model.UserToRole,
			as: 'roleList',
			foreignKey: 'userId',
			otherKey: 'roleId'
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
		// app.model.Group.belongsTo(app.model.User, {
		// 	foreignKey: 'userId',
		// 	targetKey: 'groupId',
		// 	as: 'groupList'
		// })
		// app.model.User.belongsTo(app.model.Group, {
		// 	foreignKey: 'groupId',
		// 	targetKey: 'userId',
		// 	as: 'groupList'
		// })
	}
	return user
}
