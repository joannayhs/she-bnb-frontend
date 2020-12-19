import './App.css';
import { useEffect } from 'react'
import LoginForm from './components/LoginForm'
import { connect } from 'react-redux'
import { login, getCurrentUser } from './actions/user'


function App(props) {

    useEffect( () => {
      props.getCurrentUser()
    })

    return (
      <div className="App">
        <LoginForm
          inputs={['email', 'password']}
          submitCallback={props.login}
          submitValue={'Log In'} />
      </div>
    )
  
}


export default connect(null, { login , getCurrentUser})(App);
