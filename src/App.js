import './App.css';
import React from 'react'
import LoginForm from './components/LoginForm'
import { connect } from 'react-redux'
import { login } from './actions/user'


function App(props) {


    return (
      <div className="App">
        <LoginForm
          inputs={['email', 'password']}
          submitCallback={props.login}
          submitValue={'Log In'} />
      </div>
    )
  
}


export default connect(null, { login })(App);
