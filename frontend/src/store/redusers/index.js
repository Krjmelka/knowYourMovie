import { combineReducers } from "redux";
import { userStatus } from "./user"
import { gameData } from "./game"

export default combineReducers({
    gameData,
    userStatus
})