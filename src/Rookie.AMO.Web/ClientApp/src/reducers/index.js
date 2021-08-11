import { combineReducers } from "redux";
import { CreateUserReducer } from "./CreateUserReducer";
import users from "./userReducer";
import { reducer as oidcReducer } from "redux-oidc";

import { GetAllRolesReducer } from "./GetAllRolesReducer";
import userReducer from "./userReducer";
import AssetReducer from "./AssetReducer";
import CategoryReducer from "./CategoryReducer";
import editUserReducer from "./editUserReducer";

export default combineReducers({
  getAllRoles: GetAllRolesReducer,
  createUser: CreateUserReducer,
  oidc: oidcReducer
  userReducer,
  AssetReducer,
    CategoryReducer,
    editUserReducer,
});
  
