export default function SearchForm(){
    return(
        <div className="SearchForm">
            <form>
                Enter City/State/Zip
                <input type="text" placeholder="City/State/Zip" />
                Start Date:
                <input type="date" />
                End Date:
                <input type="date"/>
                <input type="submit" value="Search" />
            </form>
        </div>
    )
}