import { connect } from 'react-redux'
import { useState } from 'react'

function AddListingForm({ amenities }){
const [formData, setFormData] = useState('')

    function renderAmenityCheckboxes(){
      return Object.keys(amenities).map(a => {
          return( 
              <>
                  <input type="checkbox" value={amenities[a].attributes.name} key={amenities[a].id} name="amenity" onChange={handleOnChange}/>
                <label key={amenities[a].attributes.name}>{amenities[a].attributes.name}</label><br/>
              </>
          )
        })
    }

    function handleOnChange(e, i){
        const listingData = [...formData]
        listingData[i] = {
            [e.target.name]: e.target.value
        }
        setFormData(listingData)
        console.log(formData)

    }

    function handleSubmit(e){
        e.preventDefault()
        console.log(e.target.value)
    }

    return(
        <div>
            <form>
                Title: <input type="text" placeholder="Title" name="title" onChange={handleOnChange}/><br/>
                Description: <input type="text" placeholder="Description" name="description" onChange={handleOnChange}/><br/>
                Type of Place:
                <select name="type_of" onChange={handleOnChange}>
                    <option name="Entire Place">Entire Place</option>
                    <option name="Private Room">Private Room</option>
                    <option name="Hotel Room">Hotel Room</option>
                    <option name="Shared Room">Shared Room</option>
                </select><br/>
                Maximum Guests Allowed:<br/>
                <input type="number" name="max_guests" onChange={handleOnChange}/><br/>
                Number of Beds Available:<br/>
                <input type="number" name="num_of_beds" onChange={handleOnChange}/><br/>
                Price Per Night:<br/>
                <input type="number" min="1" step="0.01" name="price" onChange={handleOnChange}/><br/>
                Check all included amenities: <br/>
                {renderAmenityCheckboxes()}
                Add up to 5 images: <br/>
                <input type="url" placeholder="Image URL" name="url" onChange={handleOnChange}/><br/>
                Description: <input type="text" name="description"/><br/>
                <input type="url" placeholder="Image URL" name="url" onChange={handleOnChange}/><br/>
                Description: <input type="text" name="description" /><br />
                <input type="url" placeholder="Image URL" name="url" onChange={handleOnChange}/><br/>
                Description: <input type="text" name="description" /><br />
                <input type="url" placeholder="Image URL" name="url" onChange={handleOnChange}/><br/>
                Description: <input type="text" name="description" /><br />
                <input type="url" placeholder="Image URL" name="url" onChange={handleOnChange}/><br/>
                Description: <input type="text" name="description" /><br />
                <button type="submit" onClick={handleSubmit}>Add Listing</button>
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