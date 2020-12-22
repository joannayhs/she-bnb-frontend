import { connect } from 'react-redux'
import ReservationsContainer from './ReservationsContainer'
import ListingCard from './ListingCard'
import { NavLink} from 'react-router-dom'

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

    function renderUserListings(listings){
        return listings.map(l => <ListingCard listing={l} key={l.id}/>)
    }

    return (
        <>
            <h1>Welcome, {user.attributes.first_name}</h1>
            <h2>Your Listings</h2>
            {renderUserListings(getUserListings())}
            <NavLink to='/listings/new'>Create New Listing</NavLink>
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