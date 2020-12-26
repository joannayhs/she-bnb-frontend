import { connect } from 'react-redux'

function AddAmenitiesForm( {amenities} ){
    
    function renderAmenityCheckboxes() {
        return Object.keys(amenities).map(a => {
            return (
                <div key={amenities[a].id}>
                    <input type="checkbox" key={amenities[a].id} name={amenities[a].attributes.name} onChange={handleOnChange} />
                    <label key={amenities[a].attributes.name}>{amenities[a].attributes.name}</label><br />
                </div>
            )
        })
    }
    
    function handleOnChange(e){

    }

    return(
        <form>
            Check all included amenities: <br />
            { renderAmenityCheckboxes() }
            <input type="submit" value="Add Amenities"/><br/>
        </form>

    )
}

const mapStateToProps = state => {
    return {
        amenities: state.amenities
    }
}

export default connect(mapStateToProps)(AddAmenitiesForm)