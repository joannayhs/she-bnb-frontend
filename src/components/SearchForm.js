import { useState } from 'react'

export default function SearchForm(){

    const [formData, setFormData ] = useState('')

    const handleChange = e => {

    }

    return(
        <div className="SearchForm">
            <form>
                Enter City
                <input type="text" placeholder="City" onChange={handleChange}/>
                Start Date:
                <input type="date" onChange={handleChange}/>
                End Date:
                <input type="date" onChange={handleChange}/>
                <input type="submit" value="Search" />
            </form>
        </div>
    )
}