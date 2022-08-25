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

		// return queryInterface.sequelize.transaction((t) => {
		// 	return Promise.all([
		// 		queryInterface.addColumn(
		// 			'user',
		// 			'password',
		// 			{
		// 				type: STRING(30),
		// 				allowNull: false,
		// 				defaultValue: '123456',
		// 				comment: '密码'
		// 			},
		// 			{ transaction: t }
		// 		)
		// 	])
		// })
		//
		// await queryInterface.addColumn('users', 'password', {
		// 	type: STRING(30),
		// 	allowNull: false,

		// })
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add reverting commands here.
		 *
		 * Example:
		 * await queryInterface.dropTable('users');
		 */
		return queryInterface.sequelize.transaction((t) => {
			return Promise.all([
				queryInterface.removeColumn('users', 'password', { transaction: t }),
				queryInterface.removeColumn('users', 'email', { transaction: t })
			])
		})
	}
}
