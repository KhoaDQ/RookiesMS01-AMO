import { FETCH_ROLES } from "../../actions/ManageUser/ActionType";

export function GetAllRolesReducer(state = {roles: []}, action) {
    switch (action.type) {
      case FETCH_ROLES:
        return { roles: action.payload, success: true };
      default:
        return state;
    }
  }