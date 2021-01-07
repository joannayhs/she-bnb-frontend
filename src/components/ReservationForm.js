import { useState } from 'react'
import { addReservation } from '../actions/reservations'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

function ReservationForm({listing, addReservation, user}){
    const [formData, setFormData] = useState({listing: listing, user: user})
    const history = useHistory()

    function handleOnChange(e){
        const reservationData = formData
        reservationData[e.target.name] = e.target.value
        setFormData(reservationData)
    }

    function handleSubmit(e){
        e.preventDefault()
        addReservation(formData, history)
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

function mapStateToProps(state){
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, {addReservation})(ReservationForm)