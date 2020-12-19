import { connect } from 'react-redux'
import { logout } from '../actions/user'

function LogOut(props){

    return(
        <button onClick={props.logout}>Log Out</button>
    )
}

export default connect(null, { logout })(LogOut)