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
		await queryInterface.createTable('users', {
			id: { type: INTEGER, primaryKey: true, autoIncrement: true },
			name: { type: STRING(30), allowNull: false },
			age: INTEGER,
			password: { type: STRING(30), allowNull: false, defaultValue: '123456', comment: '密码' },
			email: STRING(30),
			created_at: DATE,
			updated_at: DATE
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
