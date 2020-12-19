import { connect } from 'react-redux'
import ListingsContainer from '../Listings/ListingsContainer'

function Profile({user}){
    return (
        <>
            <h1>Welcome, {user.attributes.first_name}</h1>
            <h2>Reservations</h2>
            <ListingsContainer />
        </>
    )
}

const mapStateToProps = state => {
    return{
        user:state.user
    }
}

export default connect(mapStateToProps)(Profile)