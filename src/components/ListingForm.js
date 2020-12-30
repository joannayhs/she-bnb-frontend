import { useState } from 'react'
import { connect } from 'react-redux'
import { addListing } from '../actions/listings'

function ListingForm({ listing, user , amenities, addListing }){
const [formData, setFormData] = useState({'user_id': user.id, 'property':{}, 'amenities':{}, 'images':{}})
const stateAbrevs = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY']

    function renderAmenityCheckboxes() {
        const listingAmenities = []
        if(listing){
            listing.attributes.amenities.map(a => listingAmenities.push(a.name))
        }
        return Object.keys(amenities).map(a => {
            return (
                <>
                    <input 
                    type="checkbox" 
                    key={amenities[a].id} 
                    name={amenities[a].attributes.name} 
                    className="Amenities" 
                    onChange={handleOnChange} 
                    checked={ listingAmenities.find(l => l === amenities[a].attributes.name) ? true : false}/>

                    <label key={amenities[a].attributes.name}>{amenities[a].attributes.name}</label><br />
                </>
            )
        })
    }

    function handleOnChange(e){
        const listingData = formData 
        if(e.target.className === "Property"){
            listingData['property'][e.target.name] = e.target.value
        }else if(e.target.className === "Amenities"){
            listingData['amenities'][e.target.name] = e.target.checked
        }else if(e.target.className === "Images"){
            listingData['images'][e.target.name] = e.target.value
        }else{
            listingData[e.target.name] = e.target.value
        }
        setFormData(listingData)
        console.log(listingData)
    }

    function handleSubmit(e){
        e.preventDefault()
        addListing(formData)
    }

    return(
        <div className="ListingForm">
            <form onSubmit={handleSubmit}>
                <div className="Listing">
                    Title: <input 
                    type="text" 
                    placeholder="Title" 
                    name="title" 
                    onChange={handleOnChange} /><br/>

                    Description: <input 
                    type="text"
                    placeholder="Description" 
                    name="description" 
                    onChange={handleOnChange} /><br/>
                    
                    Type of Place:
                    <select name="type_of" onChange={handleOnChange} key="type_of">
                        <option name="" ></option>
                        <option name="Entire Place" >Entire Place</option>
                        <option name="Private Room" >Private Room</option>
                        <option name="Hotel Room" >Hotel Room</option>
                        <option name="Shared Room" >Shared Room</option>
                    </select><br/>

                    Maximum Guests Allowed:<br/>
                    <input 
                    type="number" 
                    name="max_guests" 
                    onChange={handleOnChange} /><br/>

                    Number of Beds Available:<br/>
                    <input 
                    type="number" 
                    name="num_of_beds" 
                    onChange={handleOnChange}/><br/>

                    Price Per Night:<br/>
                    <input 
                    type="number" 
                    min="1" 
                    name="price" 
                    onChange={handleOnChange} /><br/>

                </div>

                <div className="Property">
                    Address: <br />
                    Street: <input 
                    type="text" 
                    name="street" 
                    placeholder="Street" 
                    className="Property" 
                    onChange={handleOnChange} /><br />

                    City: <input 
                    type="text" 
                    name="city" 
                    placeholder="City" 
                    className="Property" 
                    onChange={handleOnChange} /><br />
                    
                    State:
                    <select name="state" 
                    className="Property" 
                    onChange={handleOnChange}>
                        <option key='blank'> </option>
                        {stateAbrevs.map(s => <option key={s}>{s}</option>)}
                    </select><br />

                    Zip: <input 
                    type="text" 
                    name="zip" 
                    className="Property" 
                    onChange={handleOnChange} /><br />
                    <br/>
                </div>

                <div className="Amenities">
                    Check all included amenities: <br />
                    {renderAmenityCheckboxes()}
                </div>


                <div className="Images"> 
                    Add an image: <br />
                    <input 
                    type="text" 
                    placeholder="Image URL" 
                    className="Images" 
                    name="img_url" 
                    id='1' 
                    onChange={handleOnChange} /><br />
                    Description: <input 
                    type="text" 
                    className="Images" 
                    name="img_description" 
                    id='1' 
                    onChange={handleOnChange} /><br />
                    <br />
                </div>
               
                
                <input 
                type="submit" 
                value="Add Listing"/>
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
export default connect(mapStateToProps, {addListing})(ListingForm)
