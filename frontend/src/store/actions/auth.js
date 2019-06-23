import { GraphQLClient } from 'graphql-request'
import jwtDecode from 'jwt-decode'

const gql = new GraphQLClient("https://knowyourmovie.herokuapp.com/graphql", {headers: {}})

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
    return async (dispatch) => {
        dispatch(checkUser())
        
        if(!localStorage.token){
            dispatch(authFailed())
            return
        }
        let data = jwtDecode(localStorage.token)
        let score = await getUserScore(data.userId)
        dispatch(userData({...data, score}))

    }
}
async function getUserScore(id){
    try{
        let res =  await gql.request(`query Score($id: Int!){
            getUserData(id: $id){
              score
            }
          }`,{id})
        return res.getUserData.score
    }
    catch(err){
        console.log(err);
    }    
}
export function logOut(){
    return (dispatch) => {
        dispatch(logOutUser())
        localStorage.removeItem('token')
    }
}