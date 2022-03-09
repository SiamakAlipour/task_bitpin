import { bitpin } from 'utils/services/api';
import { MARKET_ADD, MARKET_ALL } from 'utils/constants';

export const allMarkets = () => async (dispatch) => {
	await bitpin.get('/mkt/markets').then((res) => {
		dispatch({
			type: MARKET_ALL,
			payload: { data: res.data.results },
		});
	});
};
export const addMarket = (data) => ({
	type: MARKET_ADD,
	payload: {
		data,
	},
});
