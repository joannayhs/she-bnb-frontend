
export default function ReservationForm(){

    return(
        <>
            Start Date: <input type="date" name="start_date"/> <br/>
            End Date: <input type="date" name="end_date"/><br/>
            Number of Guests: <input type="number" name="num_of_guests"/><br/>
            <input type="submit" value="Reserve"/>
        </>
    )
}