import { connect } from 'react-redux'
import { useState } from 'react'

function AddListingForm({ amenities }){
const [formData, setFormData] = useState({"Amenities": {}, "Images":{}})

    function renderAmenityCheckboxes(){
      return Object.keys(amenities).map(a => {
          return( 
              <>
                <input type="checkbox" value={amenities[a].attributes.name} key={amenities[a].id} name={amenities[a].attributes.name} onChange={handleOnChange}/>
                <label key={amenities[a].attributes.name}>{amenities[a].attributes.name}</label><br/>
              </>
          )
        })
    }


    function handleOnChange(e){
        const listingData = formData 
        if(e.target.type === 'checkbox'){
            listingData["Amenities"][e.target.name] = e.target.checked
        }if(e.target.name === "img_url" || e.target.name === "img_description"){
            listingData["Images"][e.target.name] = e.target.value
        }if(e.target.name === 'new_amenity'){
            listingData["Amenities"][e.target.name] = { 'name': e.target.value }
        }else{
            listingData[e.target.name] = e.target.value
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
                    <option name=""></option>
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
                <input type="number" min="1" name="price" onChange={handleOnChange}/><br/>
                Check all included amenities: <br/>
                {renderAmenityCheckboxes()}
                Add up to 5 images: <br/>
                <input type="text" placeholder="Image URL" name="img_url" onChange={handleOnChange}/><br/>
                Description: <input type="text" name="img_description" onChange={handleOnChange}/><br/>
                <input type="text" placeholder="Image URL" name="img_url" onChange={handleOnChange} /><br />
                Description: <input type="text" name="img_description" onChange={handleOnChange} /><br />
                <input type="text" placeholder="Image URL" name="img_url" onChange={handleOnChange} /><br />
                Description: <input type="text" name="img_description" onChange={handleOnChange} /><br />
                <input type="text" placeholder="Image URL" name="img_url" onChange={handleOnChange} /><br />
                Description: <input type="text" name="img_description" onChange={handleOnChange} /><br />
                <input type="text" placeholder="Image URL" name="img_url" onChange={handleOnChange} /><br />
                Description: <input type="text" name="img_description" onChange={handleOnChange} /><br />
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