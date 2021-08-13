import * as types from "../actions/ManagerCategory/ActionType";

const initialState = [];

function CategoryReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.FETCH_CATEGORY:
      return payload;

    default:
      return state;
  }
}

export default CategoryReducer;
