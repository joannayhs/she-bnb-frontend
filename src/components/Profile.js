import { connect } from 'react-redux'

function Profile({user}){
    return (
        <>
            <h1>Welcome, {user.attributes.first_name}</h1>
            <h2>Reservations</h2>
            <h2>Listings</h2>
        </>
    )
}

const mapStateToProps = state => {
    return{
        user:state.user
    }
}

export default connect(mapStateToProps)(Profile)