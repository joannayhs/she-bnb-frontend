
export default function ListingCard({listing}){

    function renderImgs(){
        if(listing.attributes.images.length > 0){
            listing.attributes.images.forEach(i => {
                return <img src={i.url}/> 
            })
        }
    }
    
    return (
        <div className="ListingCard">
            <h3>{listing.attributes.title}</h3>
            {renderImgs()}
            <p>{listing.attributes.description}</p>
            <p>Max Guests: {listing.attributes.max_guests}</p>
            <p>Number of Beds: {listing.attributes.num_of_beds}</p>
        </div>
    )
}