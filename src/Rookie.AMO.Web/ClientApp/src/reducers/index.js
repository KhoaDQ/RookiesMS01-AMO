import { combineReducers } from "redux";
import { CreateUserReducer } from "./CreateUserReducer";
import users from "./userReducer";
import { reducer as oidcReducer } from "redux-oidc";

import { GetAllRolesReducer } from "./GetAllRolesReducer";

export default combineReducers({
  users,
  getAllRoles: GetAllRolesReducer,
  createUser: CreateUserReducer,
  oidc: oidcReducer
});