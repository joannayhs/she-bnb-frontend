import './App.css';
import LoginForm from './components/LoginForm'
import { connect } from 'react-redux'
import { login } from './actions/user'

function App() {

  return (
    <div className="App">
      <LoginForm 
        inputs={['email', 'password']}
        submitCallback={login}
        submitValue={'Log In'}/>
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    
  }
}

export default connect(null, mapDispatchToProps)(App);
