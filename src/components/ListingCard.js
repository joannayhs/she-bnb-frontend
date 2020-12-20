
export default function ListingCard({listing}){

    return (
        <div className="ListingCard">
            <h3>{listing.attributes.title}</h3>
            <p>{listing.attributes.description}</p>
            <p>Max Guests: {listing.attributes.max_guests}</p>
            <p>Number of Beds: {listing.attributes.num_of_beds}</p>
        </div>
    )
}