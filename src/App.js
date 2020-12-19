import './App.css';
import { useEffect } from 'react'
import NavBar from './components/NavBar'
import SearchContainer from './components/SearchContainer'
import LoginContainer from './components/LoginContainer'
import SignUpContainer from './components/SignUpContainer'
import ExploreContainer from './components/ExploreContainer'
import { connect } from 'react-redux'
import { getCurrentUser } from './actions/user'
import { Route, Switch } from 'react-router-dom'


function App(props) {

    useEffect( () => {
      props.getCurrentUser()
    }, [])


    return (
      <div className="App">

        <Switch>
          <Route exact path='/login'>
            <LoginContainer />
          </Route>
          <Route exact path='/signup'>
            <SignUpContainer />
          </Route>
        </Switch>
        
          <NavBar />
          <SearchContainer />
          <ExploreContainer />
          {/* <SignUpForm 
              inputs={['Email', 'First Name', 'Last Name', 'password']}
              submitCallback={props.signUp}
              submitValue={'Sign Up'}
          />
        
       
          <LoginForm
            inputs={['email', 'password']}
            submitCallback={props.login}
            submitValue={'Log In'} />
      

          <LogOutButton />  */}
      </div>
    )
  
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, {getCurrentUser})(App);
