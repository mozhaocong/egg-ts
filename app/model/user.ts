export default (app) => {
	const { STRING, INTEGER, VIRTUAL } = app.Sequelize
	const User = app.model.define('user', {
		id: { type: INTEGER, primaryKey: true, autoIncrement: true, comment: '用户ID' },
		name: { type: STRING(30), primaryKey: true, allowNull: false, comment: '用户账号' },
		email: { type: STRING(30), defaultValue: '123456@', primaryKey: true, comment: '邮箱' },
		age: {
			type: INTEGER,
			allowNull: true,
			validate: {
				isIn: [[5, 10]]
			}
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
	})
	return User
}
