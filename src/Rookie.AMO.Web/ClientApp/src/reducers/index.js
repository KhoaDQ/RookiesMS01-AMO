import { combineReducers } from "redux";
import userReducer from "./userReducer";
import AssetReducer from "./AssetReducer";
import CategoryReducer from "./CategoryReducer";
export default combineReducers({
  userReducer,
  AssetReducer,
  CategoryReducer,
});