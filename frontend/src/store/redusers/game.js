const gameState = {
    isLoaded: false,
    isLoading: false,
    data: {},
  }
export function gameData(state = gameState, action) {
    switch (action.type) {
        case 'GET_DATA':
            return {
                ...state,
                isLoading: true,
                isLoaded: false
            };
        case 'GET_DATA_SUCCESS':
            return {
                isLoading: false,
                isLoaded: true,
                data: action.payload
            }
        default:
            return state;
    }
}