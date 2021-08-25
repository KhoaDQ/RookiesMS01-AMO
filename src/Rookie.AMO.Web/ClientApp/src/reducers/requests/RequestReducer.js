import * as types from '../../actions/ManagerRequest/ActionType';

const initialState = [];

function RequestReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.FETCH_REQUESTS:
      return payload;

    default:
      return state;
  }
}

export default RequestReducer;
