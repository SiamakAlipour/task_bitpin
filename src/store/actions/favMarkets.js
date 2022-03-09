import { FAV_ADD, FAV_GET, FAV_REMOVE } from 'constants/types';

export const addFav = (data) => ({
	type: FAV_ADD,
	payload: {
		data,
	},
});
export const getFav = () => ({
	type: FAV_GET,
});
export const removeFav = (code) => ({
	type: FAV_REMOVE,
	payload: {
		code,
	},
});
