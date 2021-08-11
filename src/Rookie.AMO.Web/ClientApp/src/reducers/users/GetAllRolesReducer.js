import { GetAllRolesFail, GetAllRolesRequest, GetAllRolesSuccess } from "../constants/RoleConstants";

export function GetAllRolesReducer(state = {roles: []}, action) {
    switch (action.type) {
      case GetAllRolesRequest:
        return { loading: true };
      case GetAllRolesSuccess:
        return { loading: false, roles: action.payload, success: true };
      case GetAllRolesFail:
        return { loading: false, roles: action.payload };
      default:
        return state;
    }
  }