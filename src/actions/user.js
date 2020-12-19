import { SET_CURRENT_USER, CLEAR_CURRENT_USER } from '../actionTypes/index'

export const setCurrentUser = (user) => {
    return {
        type: SET_CURRENT_USER,
        user
    }
}

export function clearCurrentUser(){
    return ({
        type: CLEAR_CURRENT_USER
    })
}

export const logout = () => {
    return dispatch => {
        dispatch(clearCurrentUser())
        return fetch('http://localhost:3001/api/v1/logout', {
            credentials: "include",
            method: "DELETE"
        })
    }
}

export const login = credentials => {
    const userCredentials = {
        email: credentials[0],
        password: credentials[1]
    }
    return dispatch => {
        return fetch('http://localhost:3001/api/v1/login', {
            credentials: "include",
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(userCredentials)
        })
        .then(r => r.json())
        .then(res => {
            if(res.error){
                alert("Incorrect Credentials")
            }else{
                const user = res.data
                dispatch(setCurrentUser(user))
            }
        })
        .catch()
    }
}

export const getCurrentUser = () => {
    return dispatch => {
        return fetch('http://localhost:3001/api/v1/get_current_user', {
            credentials: "include",
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(r => r.json())
            .then(res => {
                if (res.error) {
                    console.log("No current user")
                } else {
                    const user = res.data
                    dispatch(setCurrentUser(user))
                }
            })
            .catch()
    }
}

export const signUp = credentials => {
    const userInfo = {
        user: {
            email: credentials[0],
            first_name: credentials[1],
            last_name: credentials[2],
            password: credentials[3]
        }
    }
    
    return dispatch => {
        return fetch('http://localhost:3001/api/v1/signup', {
            credentials: "include",
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userInfo)
        })
            .then(r => r.json())
            .then(res => {
                if (res.error) {
                    console.log(res.error)
                } else {
                    const userObj = res.data
                    dispatch(setCurrentUser(userObj))
                }
            })
            .catch()
    }
}