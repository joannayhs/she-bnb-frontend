import { combineReducers } from 'redux'
import { userReducer } from './userReducer'
import { listingReducer } from './listingReducer'

const rootReducer = combineReducers({
    user: userReducer,
    listings: listingReducer
})

export default rootReducer