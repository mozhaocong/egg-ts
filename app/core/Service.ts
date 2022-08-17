import { Service } from 'egg'
import {
	getDefaultPaginationData,
	getParamsRuleData,
	modelFindAll,
	simpleParamsRuleModelFindAll
} from '../utils/model/business'

export default class BaseService extends Service {
	modelFindAll = modelFindAll
	getDefaultPaginationData = getDefaultPaginationData
	getParamsRuleData = getParamsRuleData
	simpleParamsRuleModelFindAll = simpleParamsRuleModelFindAll
}
