import { useState } from 'react'
import { addReservation, updateReservation } from '../actions/reservations'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

function ReservationForm({listing, addReservation, user, reservation, updateReservation}){
    const [formData, setFormData] = useState({listing: listing, user: user})
    const history = useHistory()

    
    function handleOnChange(e){
        const reservationData = formData
        reservationData[e.target.name] = e.target.value
        setFormData(reservationData)
    }

    function handleSubmit(e){
        e.preventDefault()
        if(listing){
            addReservation(formData, history)
        }else if(reservation){
            updateReservation(formData, reservation, history)
        }
    }

    return(
        <>
        {listing ? <h1>Create Reservation for {listing.attributes.title}</h1> : ''}
        <form onSubmit={handleSubmit}>
            Start Date: <input 
            type="date" 
            name="start_date" 
            min={Date.now()} 
            onChange={handleOnChange}
            defaultValue={reservation ? reservation.attributes.start_date : null}/> <br/>

            End Date: <input 
            type="date" 
            name="end_date" 
            onChange={handleOnChange}
            defaultValue={reservation ? reservation.attributes.end_date : null}/><br/>

            Number of Guests: <input 
            type="number" 
            name="num_of_guests" 
            min='1' 
            onChange={handleOnChange}
            defaultValue={reservation ? reservation.attributes.num_of_guests : null}/><br/>

            {reservation ? <input type="submit" value="Update Reservation"/> : <input type="submit" value="Reserve"/>}

        </form>
        </>
    )
}

function mapStateToProps(state){
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, {addReservation, updateReservation})(ReservationForm)