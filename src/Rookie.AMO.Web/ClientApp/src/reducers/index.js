import { combineReducers } from "redux";
import users from "./userReducer";
import assets from "./assetReducer";
import categories from "./categoryReducer"
export default combineReducers({
  users,
  assets,
  categories
});