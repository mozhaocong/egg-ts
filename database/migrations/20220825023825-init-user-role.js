'use strict'

module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add altering commands here.
		 *
		 * Example:
		 * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
		 */
		const { INTEGER, DATE } = Sequelize
		// 用户-角色关联表
		await queryInterface.createTable('admin-user_to_role', {
			id: { type: INTEGER, primaryKey: true, autoIncrement: true, comment: '用户ID' },
			userId: { type: INTEGER, unique: true, allowNull: false, comment: '用户Id' },
			roleId: { type: INTEGER, unique: true, allowNull: false, comment: '角色Id' },
			createdAt: DATE,
			updatedAt: DATE
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
