import api from 'utils/services/api';
import { MARKET_TOGGLEFAV, MARKET_GET } from 'utils/constants';
import { GET } from 'utils/constants/index';

export const getMarkets = () => async (dispatch) => {
  await api('/mkt/markets', GET).then((res) => {
    dispatch({
      type: MARKET_GET,
      payload: { data: res.data.results },
    });
  });
};
export const toggleFavorite = (id) => ({
  type: MARKET_TOGGLEFAV,
  payload: {
    id,
  },
});
