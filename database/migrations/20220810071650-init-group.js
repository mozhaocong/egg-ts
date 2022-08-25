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
		await queryInterface.createTable('admin-group', {
			id: { type: INTEGER, primaryKey: true, autoIncrement: true },
			pId: { type: INTEGER, defaultValue: 0, comment: '上级Id,最高级为0' },
			groupName: { type: STRING(30), unique: true, allowNull: false, comment: '群组名称' },
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
