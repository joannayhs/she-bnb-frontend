
import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function ListingPage({listing}){
    useEffect(() => {
        getProperty()
    }, [])

    const [property, setProperty ] = useState('')

    function renderImgs(){
        if(listing){
            return listing.attributes.images.map(i => {
                return (
                    <>
                        <img src={i.url} width="25%" height="25%" key={i.description}/>
                        <p className="caption" key={i.url}>{i.description}</p>
                    </>
                )
            })
        }
    }

    function listAmenities(){
        if(listing){
            return listing.attributes.amenities.map(a => {
               return  <li>{a.name}</li>
            })
        }
    }

    async function getProperty(){
        if(listing){
            try {
                const res  = await fetch(`http://localhost:3001/api/v1/properties/${listing.relationships.property.data.id}`, {
                    credentials: "include",
                    method: "GET",
                    headers: {
                        "Content-Type" : "application/json "
                    }
                })
                if(!res.ok){
                    throw res
                }
                const data = await res.json()
                const property = data.data.attributes
                setProperty(property)
                }catch{
                    console.log("Unable to fetch proprerty")
                    }
            }
    }

    return(
        <>
            {renderImgs()}
            {listing ? <h2>{listing.attributes.title}</h2> : <NavLink to="/listings">See all listings</NavLink>}
            {listing ? <h3>{listing.attributes.type_of} in {property.city}</h3> : ''}
            {listing ? <p>Maximum number of guests: {listing.attributes.max_guests}</p> : ''}
            {listing ? <p>Number of beds available: {listing.attributes.num_of_beds}</p> : ''}
            <p> {listing ? listing.attributes.description : ''}</p>
            {listing ? <p>Amenities availabe  at {listing.attributes.title}: </p> : '' }
            <ul>
                {listAmenities()}
            </ul>
        </>
    )
}