import { GraphQLClient } from 'graphql-request'
import jwtDecode from 'jwt-decode'

const gql = new GraphQLClient("http://localhost:8000/graphql", {headers: {}})

export function userIsAuth(bool) {
    return {
        type: 'USER_IS_AUTH',
        isAuth: bool
    };
}
export function authFailed(bool) {
    return {
        type: 'AUTH_FAILED',
        isFailed: bool
    };
}
export function userData(data) {
    return {
        type: 'USER_DATA_REСEIVED',
        data
    }
}

export function userAuth(user, password) {
    return async (dispatch) => {
        try {
            dispatch(authFailed(false))
            let res = await gql.request(`query Auth($user: String!, $password: String!){
                userAuth(user: $user, password: $password){
                  token
                  error
                }
              }`,{user, password})
            console.log(res.userAuth);
            if (res.userAuth.error){
                dispatch(authFailed(true))
                return
            }
            localStorage.setItem('token', res.userAuth.token)
            let data = jwtDecode(res.userAuth.token)
            dispatch(userData(data))
            dispatch(userIsAuth(true))
        }
        catch(err){
            console.log(err);
        }
    }
}