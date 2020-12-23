import { GET_AMENITIES } from '../actionTypes/index'

export function amenitiesReducer(state=[], action){
    switch(action.type){
        case GET_AMENITIES: 
            return action.amenities
        default:
            return state
    }
}