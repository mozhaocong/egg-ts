import { EggPlugin } from 'egg'

const plugin: EggPlugin = {
	// static: true,
	nunjucks: {
		enable: true,
		package: 'egg-view-nunjucks'
	},
	cors: {
		enable: true,
		package: 'egg-cors'
	},
	validate: {
		enable: true,
		package: 'egg-validate'
	},
	mysql: {
		enable: true,
		package: 'egg-mysql'
	},
	sequelize: {
		enable: true,
		package: 'egg-sequelize'
	},

	jwt: {
		enable: true,
		package: 'egg-jwt'
	},

	redis: {
		enable: true,
		package: 'egg-redis'
	}
}

export default plugin
