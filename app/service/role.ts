import BaseService from '../core/Service'
// role
export default class UserService extends BaseService {
	appModel = this.app.model.Role
	setFindAllConfig = {
		include: [
			{ model: this.ctx.model.Group, as: 'groupData' },
			{
				model: this.ctx.model.User,
				as: 'userList'
			}
		]
	}
}
