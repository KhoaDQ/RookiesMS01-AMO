import { CREATE_USER } from "../../actions/ManageUser/ActionType";

export function CreateUserReducer(state = {createdUser: {}}, action) {
    switch (action.type) {
      case CREATE_USER:
        return { createdUser: action.payload, success: true };
      default:
        return state;
    }
  }