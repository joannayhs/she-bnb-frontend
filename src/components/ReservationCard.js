import { NavLink } from 'react-router-dom'

export default function ReservationCard({user, reservation, listing}){

    return(
        <div className="ReservationCard" key={reservation.id}>
            <h3>Your Trip to:</h3>
            <NavLink to={`/reservations/${reservation.id}`}>{listing ? <h2>{listing.attributes.property.city}</h2> : ''}</NavLink>
            {reservation ? <p>{reservation.attributes.start_date} to {reservation.attributes.end_date}</p> : null}

        </div>
    )
}