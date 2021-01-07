import { combineReducers } from 'redux'
import { userReducer } from './userReducer'
import { listingReducer } from './listingReducer'
import { amenitiesReducer } from './amenitiesReducer'
import { reservationReducer } from './reservationsReducer'

const rootReducer = combineReducers({
    user: userReducer,
    listings: listingReducer,
    amenities: amenitiesReducer,
    reservations: reservationReducer
})

export default rootReducer