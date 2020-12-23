import { combineReducers } from 'redux'
import { userReducer } from './userReducer'
import { listingReducer } from './listingReducer'
import { amenitiesReducer } from './amenitiesReducer'

const rootReducer = combineReducers({
    user: userReducer,
    listings: listingReducer,
    amenities: amenitiesReducer
})

export default rootReducer