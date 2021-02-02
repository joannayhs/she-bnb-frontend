import { useState } from 'react'
import { connect } from 'react-redux'
import { addAmenities } from '../actions/listings'

function SearchForm({listings, reservations}){
    const [formData, setFormData ] = useState({})
    const [results, setResults ] = useState([])

    const handleChange = e => {
        const searchData = formData 
        searchData[e.target.name] = e.target.value
        setFormData(searchData)
        console.log(formData)
    }

    function handleSubmit(e){
        e.preventDefault()
        getResults(formData)
    }

    function checkReservations(data){
        reservations.forEach(r => {
            if(data.start_date >= r.attributes.start_date && data.end_date <= r.attributes.end_date){
                return 
            }
        })
    }

    function getResults(data){
    
    }

    return(
        <div className="SearchForm">
            <form onSubmit={handleSubmit}>
                Enter City/State/Zip: 
                <input type="text" placeholder="City/State/Zip" name="city_state_zip" onChange={handleChange}/>
                Start Date:
                <input type="date" name="start_date" onChange={handleChange}/>
                End Date:
                <input type="date" name="end_date" onChange={handleChange}/>
                Number of Guests:
                <input type="number" name="num_of_guests" onChange={handleChange}/>
                <input type="submit" value="Search" />
            </form>
        </div>
    )
}

function mapStateToProps(state){
    return {
        listings: state.listings,
        reservations: state.reservations
    }
}

export default connect(mapStateToProps)(SearchForm)