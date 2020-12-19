import './App.css';
import { useEffect } from 'react'
import LoginForm from './components/LoginForm'
import SignUpForm from './components/SignUpForm'
import LogOutButton from './components/LogOut'
import { connect } from 'react-redux'
import { login, getCurrentUser, signUp } from './actions/user'


function App(props) {

    useEffect( () => {
      props.getCurrentUser()
    }, [])


    return (
      <div className="App">
       
        <SignUpForm 
            inputs={['Email', 'First Name', 'Last Name', 'password']}
            submitCallback={props.signUp}
            submitValue={'Sign Up'}
        />

        <LoginForm
          inputs={['email', 'password']}
          submitCallback={props.login}
          submitValue={'Log In'} />

        <LogOutButton />
      </div>
    )
  
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { login , getCurrentUser, signUp})(App);
