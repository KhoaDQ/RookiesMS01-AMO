import { combineReducers } from "redux";
import userReducer from "./userReducer";
import AssetReducer from "./AssetReducer";
import CategoryReducer from "./CategoryReducer";
import editUserReducer from "./editUserReducer";

export default combineReducers({
  userReducer,
  AssetReducer,
    CategoryReducer,
    editUserReducer,
});
  
