import *as types from "../actions/ManageAsset/ActionType";

const initialState = [];

function assetReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case types.FETCH_ASSETS:
            return payload.data;

        default:
            return state;
    }
};

export default assetReducer;