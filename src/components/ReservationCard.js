import { NavLink } from 'react-router-dom'

export default function ReservationCard({ reservation, listing}){

    return(
        <div className="ReservationCard" key={reservation.id}>
            <h3>Your Trip to:</h3>
            {listing ? <NavLink to={`/listings/${listing.id}`}><h4>{listing.attributes.title}</h4></NavLink> : null}
            {reservation ? <p>Check in: {Date(reservation.attributes.start_date)} </p> : null}
            {reservation ? <p>Check out: {Date(reservation.attributes.end_date)}</p> : null}

        </div>
    )
}