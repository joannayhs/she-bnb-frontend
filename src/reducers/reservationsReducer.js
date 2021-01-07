import { GET_RESERVATIONS } from '../actionTypes/index'

export function reservationReducer(state=[], action){
    switch(action.type){
        case GET_RESERVATIONS:
            return action.reservations
        default:
            return state
    }
}