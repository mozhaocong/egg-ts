export default (app) => {
	// console.log('app', app.Sequelize)
	const { STRING, INTEGER, DATE } = app.Sequelize
	// console.log('STRING', STRING)
	const User = app.model.define('user', {
		id: { type: INTEGER, primaryKey: true, autoIncrement: true },
		name: STRING(30),
		age: INTEGER,
		created_at: DATE,
		updated_at: DATE
	})

	return User
}
