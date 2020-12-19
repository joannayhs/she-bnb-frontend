import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import LogOut from './LogOut'

function NavBar({user}){

    function logInOrOut(){
        if(user){
            return(
                <>
                    <NavLink to='/' exact>Home</NavLink>
                    <NavLink to= '/profile' exact>Profile</NavLink>
                    <LogOut />
                </>
            )
        }else{
            return(
                <>
                    <NavLink to='/' exact>Home</NavLink>    
                    <NavLink to='/login' exact>Log In</NavLink> 
                        <h4>or</h4>
                    <NavLink to='/signup' exact>Sign Up</NavLink> 
                </>
            )
        }
    }

    return(
       <div className="NavBar">
          {logInOrOut()}
       </div>
    )
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(NavBar)