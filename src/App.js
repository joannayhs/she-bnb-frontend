import './App.css';
import { useEffect } from 'react'
import NavBar from './components/NavBar'
import SearchContainer from './components/SearchContainer'
import LoginContainer from './components/LoginContainer'
import SignUpContainer from './components/SignUpContainer'
import ExploreContainer from './components/ExploreContainer'
import { connect } from 'react-redux'
import { getCurrentUser } from './actions/user'
import { Route, Switch , Redirect } from 'react-router-dom'


function App(props) {

    useEffect( () => {
      props.getCurrentUser()
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
    user: state.user
  }
}

export default connect(mapStateToProps, {getCurrentUser})(App);
