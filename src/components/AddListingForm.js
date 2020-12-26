import { connect } from 'react-redux'
import { useState } from 'react'
import { addListing } from '../actions/listings'

function AddListingForm({ user , addListing }){
const [formData, setFormData] = useState({'user_id': user.id, 'amenities': [], 'images':[], 'property':{}})


    function handleOnChange(e){
        const listingData = formData 
        if(e.target.type === 'checkbox'){
            listingData['amenities'].push(e.target.name)
        }else if(e.target.name === "img_url" || e.target.name === "img_description"){
            listingData['images'] = {[e.target.id]: e.target.value}
        }else{
            listingData[e.target.name] = e.target.value
        }
        setFormData(listingData)
        console.log(formData)
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