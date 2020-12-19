import SignUpForm from './SignUpForm'
import { connect } from 'react-redux'
import { signUp } from '../../actions/user'


function SignUpContainer(props){
   
    return(
         <SignUpForm 
              inputs={['Email', 'First Name', 'Last Name', 'password']}
              submitCallback={props.signUp}
              submitValue={'Sign Up'}
          />
    )
}

export default connect(null, { signUp })(SignUpContainer)