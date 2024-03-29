'use strict'

module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add altering commands here.
		 *
		 * Example:
		 * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
		 */
		const { INTEGER, DATE, STRING } = Sequelize
		await queryInterface.createTable('admin-user', {
			id: { type: INTEGER, primaryKey: true, autoIncrement: true, comment: '用户ID' },
			name: { type: STRING(30), primaryKey: true, allowNull: false, unique: true, comment: '用户账号' },
			email: { type: STRING(30), primaryKey: true, unique: true, comment: '邮箱' },
			age: INTEGER,
			password: { type: STRING(30), allowNull: false, defaultValue: '123456', comment: '密码' },
			createdAt: DATE,
			updatedAt: DATE,
			deletedAt: DATE
		})
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add reverting commands here.
		 *
		 * Example:
		 * await queryInterface.dropTable('users');
		 */
		await queryInterface.dropTable('users')
	}
}
