import { Service } from 'egg'
import { getDefaultPaginationData, modelFindAll } from '../utils/model/business'

export default class BaseService extends Service {
	modelFindAll = modelFindAll
	getDefaultPaginationData = getDefaultPaginationData
}
