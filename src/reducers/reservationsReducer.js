import { GET_RESERVATIONS, ADD_RESERVATION, UPDATE_RESERVATION, CANCEL_RESERVATION } from '../actionTypes/index'

export function reservationReducer(state=[], action){
    switch(action.type){
        case GET_RESERVATIONS:
            return action.reservations
        case ADD_RESERVATION: 
            return state.concat(action.reservation)
        case UPDATE_RESERVATION:
            return state.map(res => res.id === action.reservation.id ? action.reservation : res)
        case CANCEL_RESERVATION:
            return state.filter(res => res.id !== action.reservation.id)
        default:
            return state
    }
}