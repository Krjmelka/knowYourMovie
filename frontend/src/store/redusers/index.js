import { combineReducers } from "redux";
import { userStatus } from "./user"
import { gameData } from "./game"
import { multiplayerGameStatus } from './multiplayerGame'

export default combineReducers({
    gameData,
    userStatus,
    multiplayerGameStatus
})