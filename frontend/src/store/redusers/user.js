export function userIsAuth(state = false, action) {
    switch (action.type) {
        case 'USER_IS_AUTH':
            return action.isAuth;

        default:
            return state;
    }
}
export function authFailed(state = false, action){
    switch (action.type) {
        case 'AUTH_FAILED':
            return action.isFailed;
        default:
            return state;
    }
}
export function userData(state = null, action){
    switch (action.type) {
        case 'USER_DATA_REСEIVED':
            return action.data;
        default: 
            return state;
    }
}