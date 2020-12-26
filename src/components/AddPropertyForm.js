import { useState } from 'react'

export default function AddPropertyForm(props){
    const [formData, setFormData] = useState('')
    const stateAbrevs = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY']


    function handleOnChange(e){
        const propertyData = formData
        propertyData[e.target.name] = e.target.value 
        setFormData(propertyData)
    }

    function handleSubmit(e){
        e.preventDefault()
    
    }

    return (
        <form onSubmit={handleSubmit}>
        Address: <br />
        Street: <input type="text" name="property" placeholder="Street" id="street" onChange={handleOnChange}/><br/>
        City: <input type="text" name="property" placeholder="City" id="city" onChange={handleOnChange}/><br/>
        State: 
        <select name="property" id="state" onChange={handleOnChange}>
            <option key='blank'> </option>
            {stateAbrevs.map(s => <option key={s}>{s}</option>)}
        </select><br/>
        Zip: <input type="text" name="property" id="zip" onChange={handleOnChange}/><br/>
        <input type="Submit" value="Add Address"/>              
        <br/>
        </form>

    )
}
