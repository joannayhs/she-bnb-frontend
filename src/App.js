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
import ReservationForm from './components/ReservationForm';
import { getReservations } from './actions/reservations';

function App({user, getCurrentUser, getListings, getAmenities, listings, getReservations, reservations }) {

    useEffect( () => {
      getCurrentUser()
      getListings()
      getAmenities()
      getReservations()
    }, [])


    return (
      <div className="App">

        <Switch>
          <Route exact path='/login'>
           {user ? <Redirect to='/' /> : <LoginContainer />}
          </Route>
          <Route exact path='/signup'>
            {user ? <Redirect to='/'/> : <SignUpContainer />}
          </Route>
          <Route exact path='/profile'>
            <NavBar />
            {user ? <Profile /> : <Redirect to='/'/>}
          </Route>
          <Route exact path='/listings'>
            <NavBar />
            <ListingsContainer />
          </Route>
          <Route exact path='/listings/new'>
            <NavBar/>
            {user ? 
            <ListingForm /> :
            <ListingsContainer/>
            }
          </Route>
          <Route exact path='/listings/:id' render={p => {
            const listing = listings.find(listing => listing.id === p.match.params.id)
            return (<>
            <NavBar />
            <ListingPage listing={listing}/>
            </>)
          }} />
          <Route exact path='/listings/:id/edit' render={p => {
            const listing = listings.find(listing => listing.id === p.match.params.id)
            return (<>
              <NavBar />
              {user ? <ListingForm listing={listing} /> : <ListingPage listing={listing}/>}
            </>)
          }} />
          <Route exact path='/listings/:id/reservations/new' render={p => {
            const listing = listings.find(listing=> listing.id === p.match.params.id)
            return(
              <>
              <NavBar />
              <ReservationForm listing={listing}/>
              </>
            )
          }} />
          <Route exact path='/reservations/:id/edit' render={p => {
            const reservation = reservations.find(res => res.id === p.match.params.id)
            return (
              <>
                <NavBar />
                <ReservationForm reservation={reservation}/>
              </>
            )
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
    listings: state.listings,
    reservations: state.reservations
  }
}

export default withRouter(connect(mapStateToProps, {getCurrentUser, getListings, getAmenities, getReservations})(App));
