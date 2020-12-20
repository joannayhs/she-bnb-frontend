import { connect } from 'react-redux'
import ListingCard from './ListingCard'
import { NavLink } from 'react-router-dom'
 
function ExploreContainer({listings}){
    
    function renderListingCards(listingsObj){
        for(const l in listingsObj){
            return <ListingCard listing={listingsObj[l]} />
        }
    }

    return(
        <div className="ExploreContainer">
            <h1>Explore Listings</h1>
            <NavLink to='/listings' exact>See All Listings</NavLink>
            {renderListingCards(listings)}
            
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        listings: state.listings
    }
}

export default connect(mapStateToProps)(ExploreContainer)

