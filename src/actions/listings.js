import {GET_LISTINGS} from '../actionTypes/index'

export const setListings = (listings) => {
    return {
        type: GET_LISTINGS,
        listings
    }
}

export const getListings = (user) => {
    return dispatch => {
        return fetch(`http://localhost:3001/api/v1/users/${user.id}/listings`, {
            credentials: "include",
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(r => r.json())
        .then(listingsInfo => {
            const listings = listingsInfo.data
            console.log(listingsInfo.data)
            dispatch(setListings(listings))
        })
        .catch("Unable to get listings")
    }
}