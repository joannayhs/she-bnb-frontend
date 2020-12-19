import LoginForm from '../LoginForm'
import { connect } from 'react-redux'
import { login } from '../../actions/user'

function LoginContainer(props){
    return(
          <LoginForm
            inputs={['email', 'password']}
            submitCallback={props.login}
            submitValue={'Log In'} />
    )
}

export default connect(null, { login })(LoginContainer)
