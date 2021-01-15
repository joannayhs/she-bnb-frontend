import { GET_RESERVATIONS, ADD_RESERVATION, UPDATE_RESERVATION } from '../actionTypes/index'

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

export function addReservation(formData, history){
    const reservation = {
        start_date: formData.start_date,
        end_date: formData.end_date,
        num_of_guests: formData.num_of_guests,
        listing_id: formData.listing.id,
        user_id: formData.user.id
    }
    return dispatch => {
        return fetch(`http://localhost:3001/api/v1/reservations`, {
            credentials: "include",
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(reservation)
        })
        .then(res => res.json())
        .then(resv => {
            const reservation = resv.data
            history.push(`/profile`)
            return dispatch({
                type: ADD_RESERVATION,
                reservation
            })
        })
        .catch("Unable to create reservation")
    }
}

export function updateReservation(formData, reservation, history){
    const resData = {
        start_date: formData.start_date,
        end_date: formData.end_date,
        num_of_guests: formData.num_of_guests,
        listing_id: reservation.attributes.listing_id,
        user_id: reservation.attributes.user_id
    }
    return dispatch => {
        return fetch(`http://localhost:3001/api/v1/reservations/${reservation.id}`, {
            credentials: "include",
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(resData)
        })
            .then(res => res.json())
            .then(resv => {
                const reservation = resv.data
                history.push(`/profile`)
                return dispatch({
                    type: UPDATE_RESERVATION,
                    reservation
                })
            })
            .catch("Unable to update reservation")
    }

}
