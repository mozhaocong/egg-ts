'use strict'

module.exports = {
	async up(queryInterface, Sequelize) {
		const { STRING } = Sequelize
		return queryInterface.sequelize.transaction((t) => {
			return Promise.all([
				queryInterface.addColumn(
					'admin-group',
					'level',
					{
						type: STRING,
						allowNull: false
					},
					{ transaction: t }
				),
				queryInterface.addColumn(
					'admin-role',
					'groupLevel',
					{
						type: STRING,
						allowNull: false
					},
					{ transaction: t }
				)
			])
		})
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.sequelize.transaction((t) => {
			return Promise.all([
				queryInterface.removeColumn('admin-group', 'level', { transaction: t }),
				queryInterface.removeColumn('admin-role', 'groupLevel', { transaction: t })
			])
		})
	}
}
