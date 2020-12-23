import { connect } from 'react-redux'

function AddListingForm({ amenities }){

    function renderAmenityCheckboxes(){
      return Object.keys(amenities).map(a => {
          return( 
              <>
                <input type="checkbox" value={amenities[a].attributes.name}/>
                <label for={amenities[a].attributes.name}>{amenities[a].attributes.name}</label>
              </>
          )
        })
    }

    return(
        <div>
            <form>
                <input type="text" placeholder="Title"/>
                <input type="text" placeholder="Description"/>
                Type of Place:
                <select >
                    <option value="Entire Place">Entire Place</option>
                    <option value="Private Room">Private Room</option>
                    <option value="Hotel Room">Hotel Room</option>
                    <option value="Shared Room">Shared Room</option>
                </select>
                Maximum Guests Allowed:
                <input type="number" id="max_guests"/>
                Number of Beds Available:
                <input type="number" id="num_of_beds"/>
                Price Per Night:
                <input type="number" min="1" step="0.01"/>
                Check all included amenities: 
                {renderAmenityCheckboxes()}
            </form>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        amenities: state.amenities
    }
}

export default connect(mapStateToProps)(AddListingForm)