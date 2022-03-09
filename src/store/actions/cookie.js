import { COOKIE_ADD, COOKIE_GET, COOKIE_REMOVE } from 'utils/constants';

export const addCookie = (value) => ({
	type: COOKIE_ADD,
	payload: {
		value,
	},
});
export const removeCookie = (code) => ({
	type: COOKIE_REMOVE,
	payload: {
		code,
	},
});
export const getCookie = () => ({
	type: COOKIE_GET,
});
