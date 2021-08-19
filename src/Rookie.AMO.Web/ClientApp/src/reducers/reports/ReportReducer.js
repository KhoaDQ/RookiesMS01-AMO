import * as types from "../../actions/Report/ReportAction";

const initialState = [];

function ReportReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.FETCH_REPORTS:
      return payload;
    default:
      return state;
  }
}

export default ReportReducer;