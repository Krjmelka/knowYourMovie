import { combineReducers } from "redux";
import { userIsAuth, authFailed, userData } from "./user"

export default combineReducers({
    userIsAuth,
    authFailed,
    userData
})