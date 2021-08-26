import * as types from "../../actions/ManageUser/ActionType";

const initialState = {};
let findIndex = (list, id) => {
  let result = -1;
  list.forEach((e, index) => {
    if (e.id === id) result = index;
  });
  return result;
}
function UserReducer(state = initialState, action) {
  const { type, payload, id } = action;
  let index = -1
  switch (type) {
    case types.FETCH_USERS:
      return payload;
    case types.DELETE_USER:
      index = findIndex(state.items, id);
      state.items[index].disable = true;
      return { ...state };
    default:
      return state;
  }
}

export default UserReducer;
