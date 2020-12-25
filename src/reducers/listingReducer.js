import { GET_LISTINGS, ADD_LISTING } from '../actionTypes/index'

export function listingReducer(state=[], action){
    switch(action.type){
        case GET_LISTINGS:
            return action.listings
        case ADD_LISTING:
            return state.concat(action.listing)
        default:
            return state
    }
}