import { combineReducers } from "redux";
import { CreateUserReducer } from "./users/CreateUserReducer";
import users from "./users/userReducer";
import { reducer as oidcReducer } from "redux-oidc";

import { GetAllRolesReducer } from "./users/GetAllRolesReducer";
import userReducer from "./users/userReducer";
import AssetReducer from "./assets/AssetReducer";
import CategoryReducer from "./categoryReducer";
import editUserReducer from "./users/editUserReducer";
import EditAsset from "./assets/EditAsset";
export default combineReducers({
  getAllRoles: GetAllRolesReducer,
  createUser: CreateUserReducer,
  oidc: oidcReducer,
  userReducer,
  AssetReducer,
  EditAsset,
  CategoryReducer,
  editUserReducer,
});
