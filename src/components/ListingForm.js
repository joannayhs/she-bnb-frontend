import {  useState } from 'react'
import { connect } from 'react-redux'
import { addListing, updateListing } from '../actions/listings'

function ListingForm({ listing, user , amenities, addListing }){
const [formData, setFormData] = useState({'user_id': user.id, 'property':{}, 'amenities':{}, 'images':[], 'listing_id': listing ? listing.id : null})
const stateAbrevs = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 
'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 
'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY']
const listingAmenities = []
const blankImg = {
        url: '',
        description: ''
    }
const [imgInputs, setImgInputs] = useState(getImgInputs())

    function getImgInputs(){
        if(listing){
            const imgArray = listing.attributes.images 
            return imgArray.map(img => {
                return {
                    url: img.url,
                    description: img.description
                }
            })
        }else{
            return [{ ...blankImg}]
        }
    }

    function renderImgInputs(){
        return imgInputs.flat().map((val, i) => {
            const imgId = `url-${i}`
            const imgDesc = `desc-${i}`
            let imgUrl = ''
            let imgDescription = ''
            if(val[i]){
                imgUrl = val[i].url
                imgDescription = val[i].description
            }else{
                imgUrl = val.url
                imgDescription = val.description
            }
            return (
                <div className={`img-${i}`}>
                    Add an image: <br />
                    Image URL: <input
                        type="text"
                        key={`url-${i}`}
                        data-idx={`img-${i}`}
                        className="Images"
                        name={imgId}
                        defaultValue={imgUrl}
                        onChange={handleOnChange} 
                        /><br />
                    Description: <input
                        type="text"
                        data-idx={`img-${i}`}
                        key={`desc-${i}`}
                        className="Images"
                        name={`${imgDesc}`}
                        defaultValue={imgDescription}
                        onChange={handleOnChange} 
                        /><br />
                    <br />
                </div>
            )
        })
    }


    function addImgInput(e){
        e.preventDefault()
        setImgInputs([...imgInputs, {...blankImg}])
    }

    function renderAmenityCheckboxes() {
        if(listing){
             listing.attributes.amenities.map(a => {
                 listingAmenities.push(a.name)
            })
        }
        return Object.keys(amenities).map(a => {
            return (
                <>
                    <input
                        type="checkbox"
                        key={Math.random()}
                        value={amenities[a].attributes.name}
                        className="Amenities"
                        onChange={handleOnChange}
                        id={amenities[a].id}
                        defaultChecked={listingAmenities.length > 0 ? listingAmenities.includes(amenities[a].attributes.name) : false}
                    />

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
            listingData['amenities'][e.target.value] = e.target.checked
        }else if(e.target.className === "Images"){
            listingData['images'][e.target.dataset.idx] = {...listingData['images'][e.target.dataset.idx], [e.target.name]: e.target.value}
        }else{
            listingData[e.target.name] = e.target.value
        }
        setFormData(listingData)
    }

    function handleSubmit(e){
        if(listing){
            e.preventDefault()
            updateListing(formData)
        }else{
            e.preventDefault()
            addListing(formData)
        }
    }

    return(
        <div className="ListingForm">
            <form onSubmit={handleSubmit}>
                <div className="Listing">
                    Title: <input 
                    type="text" 
                    placeholder="Title" 
                    name="title" 
                    onChange={handleOnChange} 
                    defaultValue={listing ? listing.attributes.title : ''}/><br/>

                    Description: <input 
                    type="text"
                    placeholder="Description" 
                    name="description" 
                    onChange={handleOnChange} 
                    defaultValue={listing ? listing.attributes.description : ''}/><br/>
                    
                    Type of Place:
                    <select name="type_of" onChange={handleOnChange} key="type_of" defaultValue={listing ? listing.attributes.type_of : ''}>
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
                    onChange={handleOnChange} 
                    defaultValue={listing ? listing.attributes.max_guests : ''}/><br/>

                    Number of Beds Available:<br/>
                    <input 
                    type="number" 
                    name="num_of_beds" 
                    onChange={handleOnChange}
                    defaultValue={listing ? listing.attributes.num_of_beds : ''}/><br/>

                    Price Per Night:<br/>
                    <input 
                    type="number" 
                    min="1" 
                    name="price" 
                    onChange={handleOnChange} 
                    defaultValue={listing ? listing.attributes.price : ''}/><br/>

                </div>
                <div className="Property">
                    Address: <br />
                    Street: <input 
                    type="text" 
                    name="street" 
                    placeholder="Street" 
                    className="Property" 
                    onChange={handleOnChange} 
                    defaultValue={listing ? listing.attributes.property.street : ''}/><br />

                    City: <input 
                    type="text" 
                    name="city" 
                    placeholder="City" 
                    className="Property" 
                    onChange={handleOnChange} 
                    defaultValue={listing ? listing.attributes.property.city : ''}/><br />
                    
                    State:
                    <select name="state" 
                    className="Property" 
                    defaultValue={listing ? listing.attributes.property.state : ''}
                    onChange={handleOnChange}>
                        <option key='blank'> </option>
                        {stateAbrevs.map(s => <option key={s}>{s}</option>)}
                    </select><br />

                    Zip: <input 
                    type="text" 
                    name="zip" 
                    className="Property" 
                    onChange={handleOnChange} 
                    defaultValue={listing ? listing.attributes.property.zip : ''}/><br />
                    <br/>
                </div>

                <div className="Amenities">
                    Check all included amenities: <br />
                    {renderAmenityCheckboxes()}
                </div>


                {renderImgInputs()}
                <button onClick={addImgInput}>Add Another Image</button><br/><br/>

                
                <input 
                type="submit" 
                value={listing ? "Update Listing" : "Add Listing"}/>
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
export default connect(mapStateToProps, {addListing, updateListing})(ListingForm)
