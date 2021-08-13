import * as types from "../../actions/ManageUser/ActionType";

const initialState = [];

function EditUserReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.UPDATE_USER:
      return payload;

    case types.GETBYID_USER:
      return payload;

    default:
      return state;
  }
}

export default EditUserReducer;
