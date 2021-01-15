import { NavLink } from 'react-router-dom'

export default function ReservationCard({ reservation, listing}){

    function handleOnClick(e){
        e.preventDefault()

    }

    return(
        <div className="ReservationCard" key={reservation.id}>
            <h3>Your Trip to:</h3>
            {listing ? <NavLink to={`/listings/${listing.id}`}><h4>{listing.attributes.title}</h4></NavLink> : null}
            {reservation ? <p>{reservation.attributes.num_of_guests} Guest(s)</p> : null}
            {reservation ? <p>{reservation.attributes.start_date} - {reservation.attributes.end_date}</p> : null}
            <NavLink to={`/reservations/${reservation.id}/edit`}>Update Reservation</NavLink>
            <button key={`res-${reservation.id}`} onClick={handleOnClick}>Cancel Reservation</button>
        </div>
    )
}