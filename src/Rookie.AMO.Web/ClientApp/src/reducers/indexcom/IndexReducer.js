import * as types from '../../actions/IndexCom/ActionType';

const initialState = '';

function IndexReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.CHANGE_INDEX:
      return payload;

    default:
      return state;
  }
}

export default IndexReducer;
