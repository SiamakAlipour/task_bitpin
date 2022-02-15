import { combineReducers } from 'redux'
import favReducer from './favReducer'

const rootReducer = combineReducers({
	fav: favReducer,
})

export default rootReducer
