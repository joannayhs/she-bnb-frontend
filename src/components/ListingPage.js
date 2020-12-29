export default function ListingPage({listing}){
    return(
        <>
        <h2>{listing.attributes.title}</h2>
        <p> {listing.attributes.description}</p>
        </>
    )
}