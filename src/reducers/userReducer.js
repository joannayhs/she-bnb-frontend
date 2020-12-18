import { SET_CURRENT_USER, CLEAR_CURRENT_USER } from '../actionTypes/index'


export function userReducer(state=null, action) {
    switch(action.type){
        case SET_CURRENT_USER:
            console.log("here")
            return action.user
        case CLEAR_CURRENT_USER:
            return null
        default:
            return state
    }
    
}