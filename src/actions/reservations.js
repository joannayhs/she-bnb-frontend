import { GET_RESERVATIONS } from '../actionTypes/index'

export function getReservations(){
    return dispatch => {
        return fetch(`http://localhost:3001/api/v1/reservations`, {
            credentials: "include",
            method: "GET",
            headers: {
                "Content-Type" :"application/json"
            }
        })
        .then(res => res.json())
        .then(reservation => {
            const resList = reservation.data
            return dispatch({
                type: GET_RESERVATIONS,
                reservations: resList
            })
        })
        .catch(console.log("Unable to get reservations"))
    }
}

export function addReservation(formData, listing_id){
    
}