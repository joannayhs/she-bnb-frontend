import { GET_RESERVATIONS, ADD_RESERVATION } from '../actionTypes/index'

export function reservationReducer(state=[], action){
    switch(action.type){
        case GET_RESERVATIONS:
            return action.reservations
        case ADD_RESERVATION: 
            return state.concat(action.reservation)
        default:
            return state
    }
}