import * as types from "../../actions/ManageUser/ActionType";

const initialState = {};

function UserReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.FETCH_USERS:
      return payload;
    case types.DELETE_USER:
      return state.filter(({ id }) => id !== payload.id);

    default:
      return state;
  }
}

export default UserReducer;
