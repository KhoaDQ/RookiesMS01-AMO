import { combineReducers } from 'redux';
import { CreateUserReducer } from './users/CreateUserReducer';
import { reducer as oidcReducer } from 'redux-oidc';

import { GetAllRolesReducer } from './users/GetAllRolesReducer';
import UserReducer from './users/UserReducer';
import AssetReducer from './assets/AssetReducer';
import CategoryReducer from './CategoryReducer';
import EditUserReducer from './users/EditUserReducer';
import EditAsset from './assets/EditAsset';
import RequestReducer from './requests/RequestReducer';

export default combineReducers({
  getAllRoles: GetAllRolesReducer,
  createUser: CreateUserReducer,
  oidc: oidcReducer,
  UserReducer,
  AssetReducer,
  EditAsset,
  CategoryReducer,
  EditUserReducer,
  RequestReducer,
});
