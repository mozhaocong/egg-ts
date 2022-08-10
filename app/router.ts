import { Application } from 'egg'

export default (app: Application) => {
	const { controller, router } = app
	router.get('/', controller.home.index)
	router.get('/user/findAll', controller.user.findAll)
	router.get('/user/findParams', controller.user.findParams)
}
