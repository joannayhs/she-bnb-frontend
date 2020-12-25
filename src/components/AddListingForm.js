import { connect } from 'react-redux'
import { useState } from 'react'
import { addListing } from '../actions/listings'

function AddListingForm({ user , amenities , addListing }){
const [formData, setFormData] = useState({'user_id': user.id, 'amenities': {}, 'images':{}, 'property':{}})
const stateAbrevs = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY']

    function renderAmenityCheckboxes(){
      return Object.keys(amenities).map(a => {
          return( 
              <div key={amenities[a].id}>
                <input type="checkbox" key={amenities[a].id} name={amenities[a].attributes.name} onChange={handleOnChange}/>
                <label key={amenities[a].attributes.name}>{amenities[a].attributes.name}</label><br/>
              </div>
          )
        })
    }


    function handleOnChange(e){
        const listingData = formData 
        if(e.target.type === 'checkbox'){
            listingData['amenities'][e.target.name] = e.target.checked
        }else if(e.target.name === "img_url" || e.target.name === "img_description"){
            listingData['images'][e.target.id] = e.target.value
        }else if(e.target.name === 'property'){
            listingData['property'][e.target.id] = e.target.value
        }else{
            listingData[e.target.name] = e.target.value
        }
        setFormData(listingData)
    }

    function handleSubmit(e){
        e.preventDefault()
        addListing(formData)
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                Title: <input type="text" placeholder="Title" name="title" onChange={handleOnChange} key="title"/><br/>
                Description: <input type="text" placeholder="Description" name="description" onChange={handleOnChange} key="description"/><br/>
                <br/>

                Address:<br/>
                Street: <input type="text" name="property" placeholder="Street" id="street" onChange={handleOnChange}/><br/>
                City: <input type="text" name="property" placeholder="City" id="city" onChange={handleOnChange}/><br/>
                State: 
                <select name="property" id="state" onChange={handleOnChange}>
                    <option key='blank'> </option>
                    {stateAbrevs.map(s => <option key={s}>{s}</option>)}
                </select><br/>
                Zip: <input type="text" name="property" id="zip" onChange={handleOnChange}/><br/>
                
                <br/>
                Type of Place:
                <select name="type_of" onChange={handleOnChange} key="type_of">
                    <option name="" key="option1"></option>
                    <option name="Entire Place" key="option2">Entire Place</option>
                    <option name="Private Room" key="option3">Private Room</option>
                    <option name="Hotel Room" key="option4">Hotel Room</option>
                    <option name="Shared Room" key='option5'>Shared Room</option>
                </select><br/>

                Maximum Guests Allowed:<br/>
                <input type="number" name="max_guests" onChange={handleOnChange} key="max_guests"/><br/>
                Number of Beds Available:<br/>
                <input type="number" name="num_of_beds" onChange={handleOnChange} key="num_of_beds"/><br/>
                Price Per Night:<br/>
                <input type="number" min="1" name="price" onChange={handleOnChange} key="price"/><br/>
                Check all included amenities: <br/>
                {renderAmenityCheckboxes()}
                Add up to 5 images: <br/>
                <input type="text" placeholder="Image URL" id='url1' name="img_url" onChange={handleOnChange}/><br/>
                Description: <input type="text" name="img_description" id='desc1' onChange={handleOnChange}/><br/>
                <input type="text" placeholder="Image URL" name="img_url" id='url2'onChange={handleOnChange} /><br />
                Description: <input type="text" name="img_description" id='desc2' onChange={handleOnChange} /><br />
                <input type="text" placeholder="Image URL" name="img_url" id='url3' onChange={handleOnChange} /><br />
                Description: <input type="text" name="img_description" id='desc3' onChange={handleOnChange} /><br />
                <input type="text" placeholder="Image URL" name="img_url" id='url4' onChange={handleOnChange} /><br />
                Description: <input type="text" name="img_description" id='desc4' onChange={handleOnChange} /><br />
                <input type="text" placeholder="Image URL" name="img_url" id='url5' onChange={handleOnChange} /><br />
                Description: <input type="text" name="img_description" id='desc5' onChange={handleOnChange} /><br />
                <br/>
                <input type="submit" key="submit" value="Add Listing"/>
            </form>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user: state.user,
        amenities: state.amenities
    }
}

export default connect(mapStateToProps, { addListing } )(AddListingForm)