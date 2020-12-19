import { GET_LISTINGS } from '../actionTypes/index'

export function listingReducer(state=[], action){
    switch(action.type){
        case GET_LISTINGS:
            return action.listings
        default:
            return state
    }
}