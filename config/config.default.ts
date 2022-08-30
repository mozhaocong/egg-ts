import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg'

export default (appInfo: EggAppInfo) => {
	const config = {} as PowerPartial<EggAppConfig>

	// override config from framework / plugin
	// use for cookie sign key, should change to your own and keep security
	config.keys = appInfo.name + '_1655368128862_7352'

	// add your egg config in here
	config.middleware = ['errorHandler', 'auth']
	// config.errorHandler = {
	//   match: '/api',
	// };

	// add your special config in here
	const bizConfig = {
		sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`
	}

	config.mysql = {
		// 单数据库信息配置
		client: {
			// host
			host: 'localhost',
			// 端口号
			port: '3306',
			// 用户名
			user: 'root',
			// 密码
			password: '123456789a',
			// 数据库名
			database: 'mzc_portal'
		},
		// 是否加载到 app 上，默认开启
		app: true,
		// 是否加载到 agent 上，默认关闭
		agent: false
	}

	config.cors = {
		origin: '*',
		allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
	}

	config.sequelize = {
		dialect: 'mysql',
		host: '127.0.0.1',
		port: 3306,
		database: 'mzc_portal',
		username: 'root',
		password: '123456789a',
		define: {
			freezeTableName: true, //直接查找设置的表名，默认是表名加s或者es
			// underscored: false, //查询是对字段驼峰类型和下划线类型进行转换
			timestamps: true, //对于create_at,和update_at，禁止查出createAt和updateAt字段，不设置为false，会同时查出来create_at和createAt
			createdAt: 'createdAt',
			// 想要 updatedAt 但是希望名称叫做 updateTimestamp
			updatedAt: 'updatedAt',
			deletedAt: 'deletedAt',
			hooks: {
				// beforeCreate(Model) {
				// 	console.log('beforeCreate', Model)
				// }
			}
		}
	}

	config.view = {
		defaultViewEngine: 'nunjucks',
		mapping: {
			'.tpl': 'nunjucks'
		}
	}

	config.jwt = {
		secret: 'jwt123456',
		enable: true, // 默认是关闭，如果开启，这会对所有请求进行自动校验；限定请求，请设置match做路径匹配
		match: /^\/api/, // 匹配的请求，会走jwt校验，否则忽略；例如登录接口需要被忽略；
		sign: {
			//jwt.sign(***,***,[options,***])方法中，options的默认设置可以在这里配置；
			expiresIn: 10000000 //多少s后过期。actionToken.js中,jwt.sing(plyload,secret,{expiresIn:number})会被合并，调用时设置优先级更高;
		}
	}

	config.redis = {
		// 单个数据库用client
		client: {
			port: 6379,
			host: '127.0.0.1',
			password: '',
			db: 0
		}
		// 使用多个数据库连接
		// clients: {
		// 	db0: {
		// 		port: 6379,
		// 		host: '127.0.0.1',
		// 		password: null,
		// 		db: 0
		// 	},
		// 	db1: {
		// 		port: 6379,
		// 		host: '127.0.0.1',
		// 		password: null,
		// 		db: 1
		// 	}
		// }
	}

	config.validate = {
		// convert: true
	}
	// the return config will combines to EggAppConfig
	return {
		...config,
		...bizConfig
	}
}
