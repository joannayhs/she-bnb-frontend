import { connect } from 'react-redux'
import ListingsContainer from './ListingsContainer'

function Profile({user, listings}){

    function getUserListings(){
        const userListings = []
        listings.map( l => {
            console.log(l.attributes.user_id === user.id)
            if(l.attributes.user_id === user.id){
                userListings.push(l)
            }
        })
        return userListings
    }

    return (
        <>
            <h1>Welcome, {user.attributes.first_name}</h1>
            <h2>Reservations</h2>
            <ListingsContainer listings={getUserListings()}/>
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