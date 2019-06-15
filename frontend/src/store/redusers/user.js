const initialState = {
    isAuth: false,
    isFailed: false,
    checkingUser: false,
    signUpSuccess: false,
    userData: {},
    error: null
}

export function userStatus(state = initialState, action){
    switch (action.type) {
        case 'CHECKING_USER':
            return {
                ...state,
                isFailed: false,
                checkingUser: true
            };
        case 'USER_IS_AUTH':
            return{
                ...state,
                checkingUser: false,
                isAuth: true,
                isFailed: false,
                error: null,
                userData: action.payload
            }
        case 'AUTH_FAILED':
            return{
                ...state,
                checkingUser: false,
                isFailed: true,
                error: action.payload
            }
        case 'REG_COMPLETE':
            return{
                ...state,
                isFailed: false,
                checkingUser: false,
                signUpSuccess: true,
                error: null
            }
        case 'SCORE_UPDATED':
            return{
                ...state,
                userData: {
                    ...state.userData,
                    score: action.payload
                } 
            }
        case 'LOG_OUT':
            return initialState
        default:
            return state
    }
}
