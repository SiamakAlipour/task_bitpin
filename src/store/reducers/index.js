import { combineReducers } from 'redux';
import marketReducer from './marketsReducer';

const rootReducer = combineReducers({
  markets: marketReducer,
});

export default rootReducer;
