import { combineReducers } from "redux";
import userReducer from "./userReducer";
import editUserReducer from "./editUserReducer";

export default combineReducers({
  userReducer,
  editUserReducer,
});
