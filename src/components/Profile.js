import { connect } from 'react-redux'
import ListingCard from './ListingCard'
import { NavLink} from 'react-router-dom'
import ReservationCard from './ReservationCard'

function Profile({user, listings, reservations}){

    function getUserListings(){
        const userListings = []
        Object.keys(listings).forEach( key => {
            if(listings[key].attributes.user_id === Number(user.id)){
                return userListings.push(listings[key])
            }
        })
        return userListings
    }

    function renderUserListings(listings){
        return listings.map(l => <ListingCard listing={l} key={l.id}/>)
    }

    function renderUserReservations(){
        const userReservations = []
        Object.keys(reservations).forEach(r => {
            if(reservations[r].attributes.user_id === Number(user.id)){
               return userReservations.push(reservations[r])
            }    
        })
        return userReservations.map(r => <ReservationCard user={user} reservation={r} listing={listings.find(l => Number(l.id) === r.attributes.listing_id)}/>)
    }

    return (
        <>
            <h1>Welcome, {user.attributes.first_name}</h1>
            <h2>Your Listings</h2>
            {renderUserListings(getUserListings())}
            <NavLink to='/listings/new'>Create New Listing</NavLink>
            <h2>Your Reservations</h2>
            {renderUserReservations()}

        </>
    )
}

const mapStateToProps = state => {
    return{
        user:state.user,
        listings: state.listings,
        reservations: state.reservations
    }
}

export default connect(mapStateToProps)(Profile)