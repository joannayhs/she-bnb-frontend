
export default function ReservationCard({user, reservation, listing}){

    return(
        <div className="ReservationCard" key={reservation.id}>
            {console.log(reservation)}
            <h3>Your Trip to:</h3>
            {listing ? <h4>{listing.attributes.property.city}</h4> : '' }
            {reservation ? <p>{reservation.attributes.start_date} to {reservation.attributes.end_date}</p> : null}

        </div>
    )
}