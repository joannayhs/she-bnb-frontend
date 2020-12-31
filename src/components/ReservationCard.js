
export default function ReservationCard({reservation, listing }){

    return(
        <div className="ReservationCard">
            
            <h3>Your Trip to:</h3>
            {listing ? <h4>{listing.attributes.property.city}</h4> : '' }
            {reservation ? <p>{reservation.start_date} to {reservation.end_date}</p> : null}

        </div>
    )
}