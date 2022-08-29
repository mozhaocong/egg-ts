import { Application } from 'egg'

export default (app: Application) => {
	const { controller, router } = app
	router.post('/admin/login', controller.admin.login)
	router.get('/user/findAll', controller.user.findAll)
	router.get('/user/findParams', controller.user.findParams)
	router.post('/user/create', controller.user.create)
	router.post('/user/update', controller.user.update)
	router.post('/user/destroy', controller.user.destroy)
	router.get('/group/findAll', controller.group.findAll)
	router.get('/group/findParams', controller.group.findParams)
	router.post('/group/create', controller.group.create)
	router.post('/role/create', controller.role.create)
	router.get('/role/findParams', controller.role.findParams)
	router.post('/role/update', controller.role.update)
}
