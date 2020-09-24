import merchantReducer from "./merchantReducer";

const { combineReducers } = require("redux");

export default combineReducers({
    merchant:merchantReducer
})