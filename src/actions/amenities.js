import { GET_AMENITIES } from '../actionTypes/index'

export const getAmenities = () => {
    return dispatch => {
        return fetch('http://localhost:3001/api/v1/amenities', {
            credentials: "include",
            method: "GET",
            headers: {
                "Conten-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(a => {
            const amenities = a.data
            return dispatch({
                type: GET_AMENITIES,
                amenities
            })
        })
        .catch(console.log("An error has occured"))

    }
}