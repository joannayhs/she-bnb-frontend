import React from 'react'

export default function ListingCard({listing}){

    return (
        <div className="ListingCard">
            <h3>{listing.attributes.title}</h3>
            {listing.attributes.images.map(i => <img src={i.url} height="25%" width="25%"/>)}
            <p>{listing.attributes.description}</p>
            <p>Max Guests: {listing.attributes.max_guests}</p>
            <p>Number of Beds: {listing.attributes.num_of_beds}</p>
        </div>
    )
}
