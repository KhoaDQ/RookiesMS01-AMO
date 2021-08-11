import { CreateUserFail, CreateUserRequest, CreateUserSuccess } from "../constants/UserConstants";

export function CreateUserReducer(state = {user: {}}, action) {
    switch (action.type) {
      case CreateUserRequest:
        return { loading: true };
      case CreateUserSuccess:
        return { loading: false, user: action.payload, success: true };
      case CreateUserFail:
        return { loading: false, user: action.payload };
      default:
        return state;
    }
  }