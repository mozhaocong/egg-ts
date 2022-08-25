export default (app) => {
	const { STRING, INTEGER } = app.Sequelize
	const User = app.model.define('group', {
		id: { type: INTEGER, primaryKey: true, autoIncrement: true, comment: '群组ID' },
		groupName: {
			type: STRING(30),
			allowNull: false,
			comment: '群组名称'
		},
		userId: {
			type: INTEGER,
			comment: '用户ID',
			references: {
				model: app.model.User,
				key: 'groupId'
			}
		}
	})
	return User
}
