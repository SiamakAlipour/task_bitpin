import { combineReducers } from 'redux'
import cookieReducer from './cookieReducer'
import favMarketsReducer from './favMarketsReducer'
import marketReducer from './marketsReducer'

const rootReducer = combineReducers({
	cookie: cookieReducer,
	markets: marketReducer,
	favMarkets: favMarketsReducer,
})

export default rootReducer
