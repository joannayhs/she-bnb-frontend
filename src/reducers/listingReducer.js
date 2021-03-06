import { GET_LISTINGS, ADD_LISTING, UPDATE_LISTING , DELETE_LISTING} from '../actionTypes/index'

export function listingReducer(state=[], action){
    switch(action.type){
        case GET_LISTINGS:
            return action.listings
        case ADD_LISTING:
            return state.concat(action.listing)
        case UPDATE_LISTING:
            return state.map(listing => listing.id === action.listing.id ? action.listing : listing)
        case DELETE_LISTING:
            return state.filter(listing => listing.id !== action.listing.id)
        default:
            return state
    }
}