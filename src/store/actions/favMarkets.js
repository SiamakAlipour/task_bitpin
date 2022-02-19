import { FAV_ADD, FAV_GET, FAV_REMOVE } from './types'

export const addFav = (data) => ({
	type: FAV_ADD,
	payload: {
		data,
	},
})
export const getFav = () => ({
	type: FAV_GET,
})
export const removeFav = (id) => ({
	type: FAV_REMOVE,
	payload: {
		id,
	},
})
