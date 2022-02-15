import { getCookie, setCookie } from '../../service/cookies'
import { FAV_ADD, FAV_GET, FAV_REMOVE } from '../actions/types'
const initialState = getCookie('fav') ? getCookie('fav') : []

const favReducer = (state = initialState, action) => {
	const { type, payload } = action
	switch (type) {
		case FAV_ADD:
			setCookie('fav', [...state, payload.value])
			return [...state, payload.value]

		case FAV_GET:
			return state
		case FAV_REMOVE:
			return state.filter((item) => item.id !== payload.id)
		// return setCookie('fav', [...state]))
		default:
			return state
	}
}

export default favReducer
