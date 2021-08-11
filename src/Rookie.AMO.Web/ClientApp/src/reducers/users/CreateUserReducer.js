import { CreateUserFail, CreateUserRequest, CreateUserSuccess } from "../../constants/UserConstants";

export function CreateUserReducer(state = {categories: {}}, action) {
    switch (action.type) {
      case CreateUserRequest:
        return { loading: true };
      case CreateUserSuccess:
        return { loading: false, category: action.payload, success: true };
      case CreateUserFail:
        return { loading: false, category: action.payload };
      default:
        return state;
    }
  }