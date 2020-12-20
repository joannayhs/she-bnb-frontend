export default function ReservationCard(props){
    

    return(
        <div className="ReservationCard">
            
            <h3>Your Trip to:</h3>
            {props.listing ? <h4>{props.listing.attributes.property.city}</h4> : null }
            {props.reservation ? <p>{props.reservation.start_date} to {props.reservation.end_date}</p> : null}

        </div>
    )
}