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
		await queryInterface.createTable(
			'admin-user',
			{
				id: { type: INTEGER, primaryKey: true, autoIncrement: true, comment: '用户ID' },
				groupId: { type: INTEGER, comment: '群组名称' },
				createdAt: DATE,
				updatedAt: DATE,
				password: { type: STRING(30), allowNull: false, defaultValue: '123456', comment: '密码' }
			},
			{ indexes: [{ unique: true, fieIds: ['name'] }] }
		)
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
