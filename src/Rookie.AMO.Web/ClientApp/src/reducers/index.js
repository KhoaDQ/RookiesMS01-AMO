import { combineReducers } from "redux";
import { CreateUserReducer } from "./users/CreateUserReducer";
import users from "./users/userReducer";
import { reducer as oidcReducer } from "redux-oidc";

import { GetAllRolesReducer } from "./users/GetAllRolesReducer";
import userReducer from "./users/userReducer";
import AssetReducer from "./assets/AssetReducer";
import editUserReducer from "./users/editUserReducer";
import CategoryReducer from "./categoryReducer"

export default combineReducers({
  getAllRoles: GetAllRolesReducer,
  createUser: CreateUserReducer,
  oidc: oidcReducer,
  userReducer,
  AssetReducer,
  CategoryReducer,
  editUserReducer,
});
  
