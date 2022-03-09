import axios from 'service/axios';
import { MARKET_ADD, MARKET_ALL } from 'constants/types';

export const allMarkets = () => async (dispatch) => {
	await axios.get('/mkt/markets').then((res) => {
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
