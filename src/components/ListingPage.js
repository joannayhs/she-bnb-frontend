
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

function ListingPage({listing, user}){

    function renderImgs(){
        if(listing){
            return listing.attributes.images.map(i => {
                return (
                    <div key={`images-${i.id}`}>
                        <img src={i.url} width="25%" height="25%" key={i.description} alt={i.description}/>
                        <p className="caption" key={`key-${i.description}`}>{i.description}</p>
                    </div>
                )
            })
        }
    }

    function listAmenities(){
        if(listing){
            return listing.attributes.amenities.map(a => {
               return  <li key={`attribute-${a.id}`}>{a.name}</li>
            })
        }
    }

    function reserveOrEdit(){
        if(listing && user){
            if(Number(user.id) === listing.attributes.user_id){
                return <NavLink to={`/listings/${listing.id}/edit`}>Edit Listing</NavLink>
            }else{
                return <NavLink to={`/listings/${listing.id}/reservations/new`}>Reserve</NavLink>
            }
        }else{
            return <NavLink to={`/listings/${listing.id}/reservations/new`}>Reserve</NavLink>
        }
    }


    return(
        <>
            {renderImgs()}
            {listing ? <h2>{listing.attributes.title}</h2> : <NavLink to="/listings">See all listings</NavLink>}
            {listing && listing.attributes.property ? <h3>{listing.attributes.type_of} in {listing.attributes.property.city}</h3> : ''}
            {listing ? <p>Maximum number of guests: {listing.attributes.max_guests}</p> : ''}
            {listing ? <p>Number of beds available: {listing.attributes.num_of_beds}</p> : ''}
            {listing ? <p>Price per night: ${listing.attributes.price}</p> : ''}
            <p> {listing ? listing.attributes.description : ''}</p>
            {listing ? <p>Amenities available at {listing.attributes.title}: </p> : '' }
            <ul>
                {listAmenities()}
            </ul>
            {reserveOrEdit()}
        </>
    )
}

function mapStateToProps(state){
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(ListingPage)