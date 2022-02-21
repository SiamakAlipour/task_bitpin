import { getCookie, setCookie } from '../../service/cookies'
import { COOKIE_ADD, COOKIE_GET, COOKIE_REMOVE } from '../actions/types'
const initialState = getCookie('fav') ? getCookie('fav') : []

const cookieReducer = (state = initialState, action) => {
	const { type, payload } = action
	switch (type) {
		case COOKIE_ADD:
			console.log('cookie added')

			setCookie('fav', [...state, payload.value], 30)
			return [...state, payload.value]

		case COOKIE_GET:
			return state
		case COOKIE_REMOVE:
			let filteredArray = state.filter((item) => item.code !== payload.code)
			setCookie('fav', filteredArray, 30)
			return filteredArray
		default:
			return state
	}
}

export default cookieReducer
