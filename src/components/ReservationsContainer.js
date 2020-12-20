import ReservationCard from './ReservationCard'
import { connect } from 'react-redux'
import { useEffect } from 'react'

function ReservationsContainer(props){
    const userReservations = props.user.attributes.reservations
    
    const resListingId = reservation => {
        for(const res in reservation){
            return reservation[res].listing_id
        }
    }
    
    const getListing = (listings) => {
        for(const l in listings){   
            if (resListingId(userReservations) === Number(listings[l].id)){
                return listings[l]
            }
        }
    }
    
    const renderReservationCards = () => {
        for(const r in userReservations){  
            return <ReservationCard reservation={userReservations[r]} listing={getListing(props.listings)} key={userReservations[r].id}/>
        }
    }

    return (
        <div className="ReservationsContainer">
            {renderReservationCards()}
        </div>
    )

}

const mapStateToProps = state => {
    return{
        listings: state.listings
    }
}

export default connect(mapStateToProps)(ReservationsContainer)