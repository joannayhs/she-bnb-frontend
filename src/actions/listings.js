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

    return dispatch => {
        return fetch('http://localhost:3001/api/v1/listings', {
            credentials: "include",
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(listing => {
            addProperty(formData, listing.data.id)
            return dispatch({
                type: ADD_LISTING,
                listing: listing.data 
            })
        })
        .catch("Unable to add listing")
    }

}

export function addProperty(formData, listing_id){
    const propertyData = {
        street: formData.property.street,
        city: formData.property.city,
        state: formData.property.state,
        zip: formData.property.zip,
        listing_id: listing_id
    }
    return fetch('http://localhost:3001/api/v1/properties', {
        credentials: "include",
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(propertyData)
    })
        .then(res => res.json())
        .then(property => {
            return property.data
        })

}


