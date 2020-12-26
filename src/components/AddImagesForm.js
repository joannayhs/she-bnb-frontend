export default function AddImagesForm(){
    
    function handleOnChange(e){

    }

    return(
        <form>
            Add up to 5 images: <br/>
            <input type="text" placeholder="Image URL" name="img_url" id='url1' onChange={handleOnChange} /><br />
            Description: <input type="text" name="img_description" id='desc1' onChange={handleOnChange} /><br />
            <input type="text" placeholder="Image URL" name="img_url" id='url2'onChange={handleOnChange} /><br />
            Description: <input type="text" name="img_description" id='desc2' onChange={handleOnChange} /><br />
            <input type="text" placeholder="Image URL" name="img_url" id='url3' onChange={handleOnChange} /><br />
            Description: <input type="text" name="img_description" id='desc3' onChange={handleOnChange} /><br />
            <input type="text" placeholder="Image URL" name="img_url" id='url4' onChange={handleOnChange} /><br />
            Description: <input type="text" name="img_description" id='desc4' onChange={handleOnChange} /><br />
            <input type="text" placeholder="Image URL" name="img_url" id='url5' onChange={handleOnChange} /><br />
            Description: <input type="text" name="img_description" id='desc5' onChange={handleOnChange} /><br />
            <br/>
            <input type="Submit" value="Submit"/>
        </form>
    )
}
