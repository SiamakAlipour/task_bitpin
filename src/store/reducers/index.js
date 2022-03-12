import { combineReducers } from 'redux';
import cookieReducer from './cookieReducer';
import marketReducer from './marketsReducer';

const rootReducer = combineReducers({
	cookie: cookieReducer,
	markets: marketReducer,
});

export default rootReducer;
