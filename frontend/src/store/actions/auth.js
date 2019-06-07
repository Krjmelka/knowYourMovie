import { GraphQLClient } from 'graphql-request'
import jwtDecode from 'jwt-decode'

const gql = new GraphQLClient("http://localhost:8000/graphql", {headers: {}})

function checkUser() {
    return {
        type: 'CHECKING_USER'
    };
}
function authFailed(payload) {
    return {
        type: 'AUTH_FAILED',
        payload
    };
}
function userData(payload) {
    return {
        type: 'USER_IS_AUTH',
        payload
    }
}
function logOutUser(){
    return {
        type: 'LOG_OUT'
    }
}

export function userAuth(user, password) {
    return async (dispatch) => {
        try {
            dispatch(checkUser())
            let res = await gql.request(`query Auth($user: String!, $password: String!){
                userAuth(user: $user, password: $password){
                  token
                  score
                  error
                }
              }`,{user, password})
            let { error, token, score } = res.userAuth
            if (error){
                dispatch(authFailed(error))
                return
            }
            localStorage.setItem('token', token)
            let data = {...jwtDecode(token), score}
            dispatch(userData(data))
        }
        catch(err){
            console.log(err);
        }
    }
}
export function checkToken(){
    return (dispatch) => {
        dispatch(checkUser())
        
        if(!localStorage.token){
            dispatch(authFailed())
            return
        }
        let data = jwtDecode(localStorage.token)
        dispatch(userData(data))
    }
}
export function logOut(){
    return (dispatch) => {
        dispatch(logOutUser())
        localStorage.removeItem('token')
    }
}