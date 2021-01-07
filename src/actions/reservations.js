import { GET_RESERVATIONS, ADD_RESERVATION } from '../actionTypes/index'

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
    if(formData.num_of_guests > formData.listing.attributes.max_guests){
        alert(`This listing only allows ${formData.listing.attributes.max_guests} guests.`)
    }else if(new Date(formData.start_date) <= new Date){
         alert(`The start date for your reservation cannot be in the past`)
    }else if(new Date(formData.start_date) > new Date(formData.end_date)){
        alert(`End date cannot be before start date`)
    }else{
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
                return dispatch({
                    type: ADD_RESERVATION,
                    reservation
                })
            })
            .catch("Unable to create reservation")
        }
    }
}