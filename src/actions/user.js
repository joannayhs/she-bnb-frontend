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
                alert("An error occured")
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
                    alert("An error occured")
                } else {
                    const user = res.data
                    dispatch(setCurrentUser(user))
                }
            })
            .catch()
    }
}