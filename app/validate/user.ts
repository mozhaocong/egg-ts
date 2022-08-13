import { isString } from '../utils'

const moment = require('moment')
function isStringDay(value: string, format: string) {
	if (!isString(value)) return false
	try {
		return moment(value).format(format) !== 'Invalid date'
	} catch (e) {
		return false
	}
}

module.exports = (app) => {
	function init() {
		app.validator.addRule('searchString', (rule: any, value) => {
			const { defType } = rule
			switch (defType) {
				case 'string':
					break
				case 'number':
					if (!/^([0-9]+\.?[0-9]*|-[0-9]+\.?[0-9]*)$/.test(value)) {
						return '类型不为number'
					}
					break
				case 'boolean':
					if (!['true', 'false'].includes(value)) {
						return '类型不为boolean'
					}
					break
				case 'date':
					// if (moment(value, 'YY-MM-DD').isValid()) {
					if (!isStringDay(value, 'YYYY-MM-DD')) {
						return '类型不为date'
					}
					break
			}
		})
	}
	init()
}
