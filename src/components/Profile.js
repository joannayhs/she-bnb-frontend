import { connect } from 'react-redux'
import ListingsContainer from './ListingsContainer'
import ReservationsContainer from './ReservationsContainer'

function Profile({user, listings}){

    function getUserListings(){
        const userListings = []
        for(const l in listings){
           if(listings[l].attributes.user_id === Number(user.id)){
               userListings.push(listings[l])
           }
        }
        return userListings
        
    }

    return (
        <>
            <h1>Welcome, {user.attributes.first_name}</h1>
            <h2>Your Listings</h2>
            <ListingsContainer listings={getUserListings()}/>
            <h2>Your Reservations</h2>
            <ReservationsContainer user={user} />

        </>
    )
}

const mapStateToProps = state => {
    return{
        user:state.user,
        listings: state.listings
    }
}

export default connect(mapStateToProps)(Profile)