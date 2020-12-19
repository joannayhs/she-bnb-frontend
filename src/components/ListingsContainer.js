import { connect } from 'react-redux'
import { getListings } from '../actions/listings'
import { useEffect } from 'react'

function ListingsContainer(props){

    useEffect(() => {
        props.getListings(props.user)
    }, [])

    return (
        <div className="ListingsContainer">
            <h1>Listings Container</h1>
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
