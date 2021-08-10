import { combineReducers } from "redux";
import { CreateUserReducer } from "./CreateUserReducer";
import users from "./userReducer";
import { reducer as oidcReducer } from "redux-oidc";


export default combineReducers({
  users,
  createUser: CreateUserReducer,
  oidc: oidcReducer
});