import { combineReducers } from "redux";
import { CreateUserReducer } from "./users/CreateUserReducer";
import { reducer as oidcReducer } from "redux-oidc";

import { GetAllRolesReducer } from "./users/GetAllRolesReducer";
import UserReducer from "./users/UserReducer";
import AssetReducer from "./assets/AssetReducer";
import CategoryReducer from "./CategoryReducer";
import editUserReducer from "./users/editUserReducer";

export default combineReducers({
  getAllRoles: GetAllRolesReducer,
  createUser: CreateUserReducer,
  oidc: oidcReducer,
  UserReducer,
  AssetReducer,
  CategoryReducer,
  editUserReducer,
});

