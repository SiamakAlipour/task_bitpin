import { combineReducers } from 'redux'
import favReducer from './favReducer'
import marketReducer from './marketsReducer'

const rootReducer = combineReducers({
	fav: favReducer,
	market: marketReducer,
})

export default rootReducer
