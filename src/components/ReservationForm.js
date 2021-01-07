
export default function ReservationForm({listing}){

    return(
        <>
        {listing ? <h1>Create Reservation for {listing.attributes.title}</h1> : ''}
            Start Date: <input type="date" name="start_date" min={Date.now()}/> <br/>
            End Date: <input type="date" name="end_date"/><br/>
            Number of Guests: <input type="number" name="num_of_guests" min='1'/><br/>
            <input type="submit" value="Reserve"/>
        </>
    )
}