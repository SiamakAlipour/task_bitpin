import { FAV_ADD, FAV_GET, FAV_REMOVE } from './types'

export const addFav = (value) => ({
	type: FAV_ADD,
	payload: {
		value,
	},
})
export const removeFav = (id) => ({
	type: FAV_REMOVE,
	payload: {
		id,
	},
})
export const getFav = () => ({
	type: FAV_GET,
})
