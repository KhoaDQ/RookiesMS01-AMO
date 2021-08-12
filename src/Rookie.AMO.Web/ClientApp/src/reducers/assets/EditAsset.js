import * as types from "../../actions/ManagerAsset/ActionType";

const initialState = {};

const EditAsset = (state = initialState, action) => {
  const { type, payload } = action;
  // console.log(action);
  switch (type) {
    case types.UPDATE_ASSETS:
      return payload;

    case types.GET_ASSET_BY_ID:
      return payload;

    default:
      return state;
  }
};

export default EditAsset;
