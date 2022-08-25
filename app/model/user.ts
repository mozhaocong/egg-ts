export default (app) => {
	const { STRING, INTEGER, VIRTUAL } = app.Sequelize
	const User = app.model.define(
		'user',
		{
			id: { type: INTEGER, primaryKey: true, autoIncrement: true, comment: '用户ID' },
			name: { type: STRING(30), primaryKey: true, allowNull: false, unique: true, comment: '用户账号' },
			email: { type: STRING(30), unique: true, comment: '邮箱' },
			age: {
				type: INTEGER,
				allowNull: true,
				validate: {
					isIn: [[5, 10]]
				}
			},
			groupId: {
				type: INTEGER,
				comment: '用户ID'
			},
			nameEmail: {
				type: VIRTUAL,
				get() {
					// @ts-ignore
					return `${this.name} ${this.email}`
				}
			}
			// createdAtData: { type: DATE, field: 'createdAtTest' },
			// updatedAtData: { type: DATE, field: 'createdAtTest' }
			// password: { type: STRING(30), allowNull: false, defaultValue: '123456', comment: '密码' }
		},
		{
			paranoid: true
		}
	)

	User.associate = function () {
		// app.model.Group.hasMany(app.model.User, {
		// 	foreignKey: 'groupId',
		// 	targetKey: 'userId'
		// })
		User.Group = app.model.User.hasMany(app.model.Group, {
			foreignKey: 'userId',
			sourceKey: 'groupId'
			// constraints: false
			// as: 'groupList'
		})
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
	return User
}
