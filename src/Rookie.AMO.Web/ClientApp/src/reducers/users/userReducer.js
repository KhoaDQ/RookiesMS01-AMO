import * as types from "../../actions/ManageUser/ActionType";

const initialState = [];

function userReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.CREATE_USER:
      return [...state, payload];

    case types.FETCH_USERS:
      // console.log(action.payload.data);
      return payload.data;

    case types.DELETE_USER:
      return state.filter(({ id }) => id !== payload.id);

    default:
      return state;
  }
}

export default userReducer;
