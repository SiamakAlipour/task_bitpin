import { COOKIE_ADD, COOKIE_GET, COOKIE_REMOVE } from './types'

export const addCookie = (value) => ({
	type: COOKIE_ADD,
	payload: {
		value,
	},
})
export const removeCookie = (id) => ({
	type: COOKIE_REMOVE,
	payload: {
		id,
	},
})
export const getCookie = () => ({
	type: COOKIE_GET,
})
