import { FAV_ADD, FAV_GET, FAV_REMOVE } from '../actions/types'

const initialState = []

const favMarketsReducer = (state = initialState, action) => {
	const { type, payload } = action

	switch (type) {
		case FAV_ADD:
			return [...state, payload.data]
		case FAV_GET:
			return state
		case FAV_REMOVE:
			return state.filter((state) => state.id !== payload.id)
		default:
			return state
	}
}

export default favMarketsReducer
