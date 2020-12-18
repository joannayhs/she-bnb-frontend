import { SET_CURRENT_USER, CLEAR_CURRENT_USER } from '../actionTypes/index'

export function setCurrentUser(user){
    return{
        type: SET_CURRENT_USER,
        user
    }
}

export function clearCurrentUser(){
    return {
        type: CLEAR_CURRENT_USER
    }
}

 export const login = async (credentials) => {
     const userCredentials = {
         email: credentials[0],
         password: credentials[1]
     }
    try {
        const res = await fetch('http://localhost:3001/api/v1/login', {
            credentials: "include",
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userCredentials)
        })
        if(!res.ok){
            throw res
        }
        const data = await res.json()
        return dispatch =>{
            dispatch(setCurrentUser(data))
        }
    }catch{
        return alert('Something went wrong')
    }
}

export const getCurrentUser = async () => {
    try{
        const res = await fetch('http://localhost:3001/api/v1/get_current_user', {
            credentials: "include",
            method: "GET",
            headers: {
                "Content-Type":"application/json"
            }
        })
        if(!res.ok){
            throw res
        }
        const data = await res.json()
        return dispatch => {
            dispatch(setCurrentUser(data))
        }
    }catch{
        alert("Something went wrong")
    }
}
