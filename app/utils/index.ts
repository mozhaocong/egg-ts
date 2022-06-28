import { throttle, debounce } from './model/public/common'
import {
	ArrayKeyToMap,
	ArrayKeyToObject,
	ArrayObjectIncludes,
	ObjectToArray,
	forArrayData,
	setArrayData,
	setObjetToObject,
	setArrayFilter,
	deepClone
} from './model/public/data'
import { isString, isObject, isArray, isFunction, isNumber, isTrue } from './model/public/typeJudgment'

export {
	throttle,
	debounce,
	ArrayObjectIncludes,
	ObjectToArray,
	isObject,
	isArray,
	ArrayKeyToObject,
	setObjetToObject,
	setArrayFilter,
	isTrue,
	ArrayKeyToMap,
	forArrayData,
	setArrayData,
	isFunction,
	deepClone,
	isString,
	isNumber
}
