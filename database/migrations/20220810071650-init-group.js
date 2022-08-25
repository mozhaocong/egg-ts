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
		await queryInterface.createTable('group', {
			id: { type: INTEGER, primaryKey: true, autoIncrement: true },
			userId: { type: INTEGER },
			groupName: STRING(30),
			createdAt: DATE,
			updatedAt: DATE
		})
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('group')
		/**
		 * Add reverting commands here.
		 *
		 * Example:
		 * await queryInterface.dropTable('users');
		 */
	}
}
