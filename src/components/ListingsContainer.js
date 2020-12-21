import { connect } from 'react-redux'
import { getListings } from '../actions/listings'
import { useEffect } from 'react'
import ListingCard from './ListingCard'

function ListingsContainer(props){

    useEffect(() => {
        props.getListings()
    }, [])

    function renderListings(listings){
        return listings.map(l => <ListingCard listing={l} key={l.id}/>)
    }

    return (
        <div className="ListingsContainer">
            {renderListings(props.listings)}        
        </div>
    )

}

const mapStateToProps = state => {
    return {
        user: state.user,
        listings: state.listings
    }
}

export default connect(mapStateToProps, { getListings })(ListingsContainer)
