import {GET_LISTINGS, ADD_LISTING, UPDATE_LISTING} from '../actionTypes/index'

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

    Object.keys(formData.amenities).map(a => {
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
                console.log(listing.data)
                updateProperty(formData, listing.data)
                updateImages(formData, listing.data)
                updateAmenities(formData, listing.data.id)
                return dispatch({
                    type: UPDATE_LISTING,
                    listing: listing.data
                })
            })
            .catch("Unable to update listing")
    }

}

export function updateAmenities(formData, listing_id) {
    const amenityData = {
        listing_id: listing_id
    }

    Object.keys(formData.amenities).map(a => {
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
    if(formData.images.length > 0){
        formData.images.map((img, i) => {
            if(i.startsWith('id')){
                const index = i.slice(-1)
                const image = listing.attributes.images.find(i => i.id === i.slice(-1))
                const imageData = {
                    url: img.url-{index},
                    description: img.desc-{index}
                }
                return fetch(`http://localhost:3001/api/v1/images/${image.id}`, {
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
            }else if(i.startsWith('new')){
                const index = i.slice(-1)
                const imageData = {
                    url: img.url-{index},
                    description: img.desc-{index},
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
}

export function updateProperty(formData, listing) {
    if(formData.property.length > 0){
        const property = listing.attributes.property.find(p => p.listing_id === listing.id)
        const propertyData = {
            property: formData.property,
            listing_id: listing_id
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