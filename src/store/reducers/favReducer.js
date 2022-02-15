import { getCookie, setCookie } from '../../service/cookies'
import { FAV_ADD, FAV_GET, FAV_REMOVE } from '../actions/types'
const initialState = JSON.parse(getCookie('fav'))
const favReducer = (state = initialState, action) => {
	const { type, payload } = action
	switch (type) {
		case FAV_ADD:
			return setCookie('fav', JSON.stringify([...state, payload.value]))

		case FAV_GET:
			return state
		case FAV_REMOVE:
			state.filter((item) => item.id !== payload.id)
			return setCookie('fav', JSON.stringify([...state]))
		default:
			return state
	}
}

export default favReducer