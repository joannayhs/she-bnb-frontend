import React from 'react'
import { NavLink } from 'react-router-dom'
export default function ListingCard({listing}){

    return (
        <div className="ListingCard">
            <NavLink to={`listings/${listing.id}`}>{listing.attributes.title}</NavLink><br/>
            {listing.attributes.images.map(i => <img src={i.url} key={i.description} height="25%" width="25%"/>)}
            <p>{listing.attributes.description}</p>
            <p>Max Guests: {listing.attributes.max_guests}</p>
            <p>Number of Beds: {listing.attributes.num_of_beds}</p>
        </div>
    )
}
