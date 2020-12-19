import { connect } from 'react-redux'
import { getListings } from '../actions/listings'
import { useEffect } from 'react'
import ListingCard from './ListingCard'

function ListingsContainer(props){

    useEffect(() => {
        props.getListings()
    }, [])

    function renderListings(listings){
         return listings.map( l => {
             return <ListingCard listing={l}/>
         })
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
    }
}

export default connect(mapStateToProps, { getListings })(ListingsContainer)
