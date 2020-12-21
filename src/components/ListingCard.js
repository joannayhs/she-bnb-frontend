
import { Carousel } from 'react-bootstrap'

export default function ListingCard({listing}){

    function renderImgs(){
        const images = listing.attributes.images
        for(const i in images){
            return <img src={images[i].url}/>
                    // <Carousel.Item>
                    //     <img
                    //         className="d-block w-100"
                    //         src={images[i].url}
                    //         alt={images[i].description}
                    //     />
                    //     <Carousel.Caption>
                    //         <p>{images[i].description}</p>
                    //     </Carousel.Caption>
                    // </Carousel.Item>
            
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
