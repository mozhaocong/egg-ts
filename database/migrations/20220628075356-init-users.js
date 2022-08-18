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
			'user',
			{
				id: { type: INTEGER, primaryKey: true, autoIncrement: true, comment: '用户ID' },
				name: { type: STRING(30), primaryKey: true, allowNull: false, comment: '用户账号' },
				email: { type: STRING(30), defaultValue: '123456@', primaryKey: true, comment: '邮箱' },
				age: INTEGER,
				createdAt: DATE,
				updatedAt: DATE
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
