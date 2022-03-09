import { MARKET_ADD, MARKET_ALL } from 'utils/constants';

const initialState = null;

const marketReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case MARKET_ALL:
			return payload.data;
		case MARKET_ADD:
			return [payload.data, ...state];
		default:
			return state;
	}
};

export default marketReducer;
