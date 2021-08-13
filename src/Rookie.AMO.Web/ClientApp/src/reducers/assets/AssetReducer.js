import *as types from "../../actions/ManagerAsset/ActionType";

const initialState = [];

function AssetReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case types.CREATE_ASSET:
            return [...state, payload];

        case types.FETCH_ASSETS:
            return payload;

        default:
            return state;
    }
};

export default AssetReducer;
