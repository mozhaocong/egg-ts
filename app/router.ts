import { Application } from 'egg'

export default (app: Application) => {
	const { controller, router } = app
	router.post('/admin/login', controller.admin.login)
	// 用户表
	router.get('/base/user/findAll', controller.user.findAll)
	router.get('/base/user/findParams', controller.user.findParams)
	router.post('/base/user/create', controller.user.create)
	router.post('/base/user/update', controller.user.update)
	router.post('/base/user/destroy', controller.user.destroy)
	// 群组表
	router.get('/base/group/findAll', controller.group.findAll)
	router.get('/base/group/findParams', controller.group.findParams)
	router.post('/base/group/create', controller.group.create)
	// 角色表
	router.post('/base/role/create', controller.role.create)
	router.get('/base/role/findParams', controller.role.findParams)
	router.post('/base/role/update', controller.role.update)
}
