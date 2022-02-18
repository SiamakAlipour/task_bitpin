import axios from '../../service/axios'
import { MARKET_GET } from './types'

export const marketGet = () => async (dispatch) => {
	await axios
		.get('/mkt/markets')
		.then((res) => {
			dispatch({
				type: MARKET_GET,
				payload: {
					data: res.data.results,
				},
			})
		})
		.catch((err) => console.log(err))
}
