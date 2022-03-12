import { MARKET_TOGGLEFAV, MARKET_GET } from 'utils/constants';

const initialState = [];

const marketReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case MARKET_GET:
			return [...state, ...payload.data].map((item) => ({
				...item,
				liked: false,
			}));
		case MARKET_TOGGLEFAV:
			return state.map((state) =>
				state.id === payload.id ? { ...state, liked: !state.liked } : state
			);
		default:
			return state;
	}
};

export default marketReducer;
