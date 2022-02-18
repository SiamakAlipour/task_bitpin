import { MARKET_GET } from '../actions/types'

const initialState = []

const marketReducer = (state = initialState, action) => {
	const { type, payload } = action

	switch (type) {
		case MARKET_GET:
			return [...state, payload.data]
		default:
			return state
	}
}

export default marketReducer
