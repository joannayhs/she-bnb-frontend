import { connect } from 'react-redux'
import ListingCard from './ListingCard'
import { NavLink } from 'react-router-dom'
import ListingsContainer from './ListingsContainer'
 
function ExploreContainer({listings}){

    return(
        <div className="ExploreContainer">
            <h1>Explore Listings</h1>
            <NavLink to='/listings' exact>See All Listings</NavLink>
            <ListingsContainer />
            
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        listings: state.listings
    }
}

export default connect(mapStateToProps)(ExploreContainer)

