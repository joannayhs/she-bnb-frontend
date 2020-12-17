import './App.css';
import LoginFrom from './components/LoginForm'

function App() {
  return (
    <div className="App">
      <LoginForm 
        inputs={['username', 'password']}
        submitCallback={}
        submitValue={'Log In'}/>
    </div>
  );
}

export default App;
