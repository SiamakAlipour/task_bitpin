/* eslint-disable */
import { MARKET_TOGGLEFAV, MARKET_GET } from 'utils/constants';
import { checkCookieExist } from 'utils/helpers/index';

const initialState = [];

const marketReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case MARKET_GET:
      return payload.data.map((item) =>
        checkCookieExist(item.id)
          ? {
              ...item,
              liked: true,
            }
          : {
              ...item,
              liked: false,
            },
      );
    case MARKET_TOGGLEFAV:
      return state.map((state) =>
        state.id === payload.id ? { ...state, liked: !state.liked } : state,
      );
    default:
      return state;
  }
};

export default marketReducer;
