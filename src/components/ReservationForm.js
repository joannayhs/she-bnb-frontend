import { useState } from 'react'
import { addReservation } from '../actions/reservations'
import { connect } from 'react-redux'

function ReservationForm({listing, addReservation}){
    const [formData, setFormData] = useState({})

    function handleOnChange(e){
        const reservationData = formData
        reservationData[e.target.name] = e.target.value
        setFormData(reservationData)
    }

    function handleSubmit(e){
        e.preventDefault()
        addReservation(formData, listing)
    }

    return(
        <>
        {listing ? <h1>Create Reservation for {listing.attributes.title}</h1> : ''}
        <form onSubmit={handleSubmit}>
            Start Date: <input type="date" name="start_date" min={Date.now()} onChange={handleOnChange}/> <br/>
            End Date: <input type="date" name="end_date" onChange={handleOnChange}/><br/>
            Number of Guests: <input type="number" name="num_of_guests" min='1' onChange={handleOnChange}/><br/>
            <input type="submit" value="Reserve"/>
        </form>
        </>
    )
}

export default connect(null, {addReservation})(ReservationForm)