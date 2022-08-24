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
			'admin-role',
			{
				id: { type: INTEGER, primaryKey: true, autoIncrement: true, comment: '角色ID' },
				groupId: { type: INTEGER, comment: '关联群组ID' },
				permissionId: { type: INTEGER, comment: '关联权限ID' },
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

//  用户 - 角色  用户包含多个角色  角色包含多个用户
// 群组 是树型结构， 权限从上到下
// 群组 - 角色 一个群组包含多个角色 一个角色只能关系一个群组
// 角色 - 权限  角色 对多 权限  权限 一个 角色
