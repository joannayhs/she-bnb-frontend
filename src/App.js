import './App.css';
import { useEffect } from 'react'
import NavBar from './components/NavBar'
import SearchContainer from './components/SearchContainer'
import LoginContainer from './components/LoginContainer'
import SignUpContainer from './components/SignUpContainer'
import ExploreContainer from './components/ExploreContainer'
import Profile from './components/Profile'
import { connect } from 'react-redux'
import { getCurrentUser } from './actions/user'
import { getListings } from './actions/listings'
import { getAmenities } from './actions/amenities'
import { Route, Switch , Redirect, withRouter } from 'react-router-dom'
import ListingsContainer from './components/ListingsContainer';
import ListingForm from './components/ListingForm'
import ListingPage from './components/ListingPage'

function App(props) {

    useEffect( () => {
      props.getCurrentUser()
      props.getListings()
      props.getAmenities()
    }, [])


    return (
      <div className="App">

        <Switch>
          <Route exact path='/login'>
           {props.user ? <Redirect to='/' /> : <LoginContainer />}
          </Route>
          <Route exact path='/signup'>
            {props.user ? <Redirect to='/'/> : <SignUpContainer />}
          </Route>
          <Route exact path='/profile'>
            <NavBar />
            {props.user ? <Profile /> : <Redirect to='/'/>}
          </Route>
          <Route exact path='/listings'>
            <NavBar />
            <ListingsContainer />
          </Route>
          <Route exact path='/listings/new'>
            <NavBar/>
            {props.user ? 
            <ListingForm /> :
            <ListingsContainer/>
            }
          </Route>
          <Route exact path='/listings/:id' render={p => {
            const listing = props.listings.find(listing => listing.id === p.match.params.id)
            return (<>
            <NavBar />
            <ListingPage listing={listing}/>
            </>)
          }} />
          <Route exact path='/listings/:id/edit' render={p => {
            const listing = props.listings.find(listing => listing.id === p.match.params.id)
            return (<>
              <NavBar />
              {props.user ? <ListingForm listing={listing} /> : <ListingPage listing={listing}/>}
            </>)
          }} />
          <Route path='/'>
            <NavBar />
            <SearchContainer />
            <ExploreContainer />
          </Route>
        </Switch>
        
     
      </div>
    )
  
}

const mapStateToProps = state => {
  return {
    user: state.user,
    listings: state.listings
  }
}

export default withRouter(connect(mapStateToProps, {getCurrentUser, getListings, getAmenities})(App));
