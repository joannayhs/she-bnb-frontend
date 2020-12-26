import { useState, useEffect } from 'react'

export default function ReservationCard(props){
    const [ property, setProperty ] = useState('')

     function getProperty(){
        fetch(`http://localhost:3001/api/v1/properties/${props.listing.relationships.property.data.id}`, {
            credentials: "include",
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(property => {
            setProperty(property.data)
        })
        .catch("Unable to fetch property")
    }

    useEffect(()=>{
        getProperty()
        console.log(property)
    }, [])

    return(
        <div className="ReservationCard">
            
            <h3>Your Trip to:</h3>
            {property ? <h4>{property.attributes.city}</h4> : null }
            {props.reservation ? <p>{props.reservation.start_date} to {props.reservation.end_date}</p> : null}

        </div>
    )
}