import {GET_LISTINGS, ADD_LISTING} from '../actionTypes/index'

export const setListings = (listings) => {
    return {
        type: GET_LISTINGS,
        listings
    }
}

export const getListings = () => {
    return dispatch => {
        return fetch(`http://localhost:3001/api/v1/listings`, {
            credentials: "include",
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(r => r.json())
        .then(listingsInfo => {
            const listings = listingsInfo.data
            dispatch(setListings(listings))
        })
        .catch("Unable to get listings")
    }
}

export function addListing(formData){
    const listingData = {
       title: formData.title,
       description: formData.description, 
       type_of: formData.type_of, 
       max_guests: formData.max_guests,
       num_of_beds: formData.num_of_beds,
       price: formData.price,
       user_id: formData.user_id 
    }
    return dispatch => {
        return fetch('http://localhost:3001/api/v1/listings', {
            credentials: "include",
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(listingData)
        })
        .then(res => res.json())
        .then(listing => {
            return dispatch({
                type: ADD_LISTING,
                listing: listing.data 
            })
        })
        .catch("Unable to add listing")
    }
}