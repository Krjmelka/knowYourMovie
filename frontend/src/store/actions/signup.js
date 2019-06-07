import { GraphQLClient } from 'graphql-request'

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
function signupComplete() {
    return {
        type: 'REG_COMPLETE'
    };
}

export function userSignup(nickname, password, email){
    return async (dispatch) => {
        try {
            dispatch(checkUser())
            let res = await gql.request(`mutation CreateUser($nickname: String!, $password: String!, $email: String!) {
                createUser(user: $nickname, password: $password, email: $email) {
                  user
                  error
                }
              }`, {nickname, password, email})
            let {error} = res.createUser
            if(error){
                dispatch(authFailed(error))
                return
            }
            dispatch(signupComplete())
        }
        catch(err){
            console.log(err)
        }
    }
}
