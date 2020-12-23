import { GET_AMENITIES } from '../actionTypes/index'

export const getAmenities = () => {
    return dispatch => {
        const res = fetch('http://localhost:3001/api/v1/amenities', {
            credentials: "include",
            method: "GET",
            headers: {
                "Content Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(a => {
            const amenities = a.data
            dispatch({
                type: GET_AMENITIES,
                amenities
            })
        })

    }
}