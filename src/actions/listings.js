import {GET_LISTINGS, ADD_LISTING, UPDATE_LISTING, DELETE_LISTING} from '../actionTypes/index'
import { Redirect } from 'react-router-dom'

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

// add listing actions 
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
            addImages(formData, listing.data.id)
            addAmenities(formData, listing.data.id)
            dispatch({
                type: ADD_LISTING,
                listing: listing.data 
                })
                return <Redirect to={`listings/${listing.data.id}`} />
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
        .catch("Unable to add address")
}

export function addImages(formData, listing_id){
    return formData.images.map( (img, i) => {
        const imageData = {
            url: img.url-{i},
            description: img.desc-{i},
            listing_id: listing_id
        }
        return fetch('http://localhost:3001/api/v1/images', {
            credentials: "include",
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(imageData)
        })
        .then(res => res.json())
        .then(image => {
            return image.data
        })
        .catch("Unable to add image")
    })

}

export function addAmenities(formData, listing_id){
    const amenityData = {
        listing_id: listing_id
    }

    Object.keys(formData.amenities).forEach(a => {
        if(formData.amenities[a] === true){
            amenityData['name'] = a
           return fetch('http://localhost:3001/api/v1/amenities_listings', {
               credentials: "include", 
               method: "POST",
               headers: {
                   "Content-Type" : "application/json"
               },
               body: JSON.stringify(amenityData)
           })
           .then(res => res.json())
           .then(amenity => {
               return amenity.data
           })
           .catch("Unable to assign amenities to listing")
        }
    })

}

//update listing actions
export function updateListing(formData){
    return dispatch => {
        return fetch(`http://localhost:3001/api/v1/listings/${formData.listing_id}`, {
            credentials: "include",
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(listing => {
                updateProperty(formData, listing.data)
                updateImages(formData, listing.data)
                updateAmenities(formData, listing.data.id)
                dispatch({
                    type: UPDATE_LISTING,
                    listing: listing.data
                })
                return <Redirect to={`/listings/${listing.data.id}`} />
            })
            .catch("Unable to update listing")
    }

}

export function updateAmenities(formData, listing_id) {
    const amenityData = {
        listing_id: listing_id
    }

    Object.keys(formData.amenities).forEach(a => {
        if (formData.amenities[a] === true) {
            amenityData['name'] = a
            return fetch('http://localhost:3001/api/v1/amenities_listings', {
                credentials: "include",
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(amenityData)
            })
                .then(res => res.json())
                .then(amenity => {
                    return amenity.data
                })
                .catch("Unable to assign amenities to listing")
        }else if(formData.amenities[a] === false) {
            amenityData['name'] = a
            return fetch('http://localhost:3001/api/v1/amenities_listings', {
                credentials: "include",
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(amenityData)
            })
                .then(res => res.json())
                .then(amenity => {
                    return amenity.data
                })
                .catch("Unable to remove amenities from listing")
        }
    })

}

export function updateImages(formData, listing) {
    const images = formData.images
        Object.keys(images).forEach( key => {
            if(key.startsWith('id')){
                const index = key.slice(-1)
                const imageData = {
                    url: images[key].url-{index},
                    description: images[key].desc-{index}
                }
                return fetch(`http://localhost:3001/api/v1/images/${images[key].id}`, {
                    credentials: "include",
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(imageData)
                })
                .then(res => res.json())
                .then(image => {
                    return image.data
                })
                .catch("Unable to update image")
            }else if(key.startsWith('new')){
                const url = Object.keys(images[key]).shift()
                const description = Object.keys(images[key]).pop()
                const imageData = {
                    url: images[key][url],
                    description: images[key][description],
                    listing_id: listing.id
                }
                return fetch('http://localhost:3001/api/v1/images', {
                    credentials: "include",
                    method: "POST",
                    headers: {
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify(imageData)
                })
                .then(res => res.json())
                .then(image => {
                    return image.data
                })
                .catch("Unable to update images")

            }
        })
}

export function updateProperty(formData, listing) {
    if(formData.property.length > 0){
        const property = listing.attributes.property.find(p => p.listing_id === listing.id)
        const propertyData = {
            property: formData.property,
            listing_id: listing.id
        }
        return fetch(`http://localhost:3001/api/v1/properties/${property.id}`, {
            credentials: "include",
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(propertyData)
        })
            .then(res => res.json())
            .then(property => {
                return property.data
            })
            .catch("Unable to update address")
        }
    }

    export function deleteImage(imageId){
        return fetch(`http://localhost:3001/api/v1/images/${imageId}`, {
            credentials: "include",
            method: "DELETE",
            headers: {
                "Content-Type":"application/json"
            }
        })
        .then(res => res.json())
        .then( image => {
            return image.data
        })
        .catch("Unable to delete image")
    }

    export function deleteListing(listing){
        return dispatch => {
            return fetch(`http://localhost:3001/api/v1/listings/${listing.id}`, {
                credentials: "include",
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json"  
                }
            })
            .then(res => res.json())
            .then(resp => {
                dispatch({
                    action: DELETE_LISTING,
                    listing
                })
                return <Redirect to="/profile"/>
            })
            .catch("Unable to delete listing")
        }
    }