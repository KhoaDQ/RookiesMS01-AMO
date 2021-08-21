import { useState } from "react";
import *as types from "../../actions/ManagerAsset/ActionType";

const initialState = {};

function AssetReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case types.CREATE_ASSET:
            return {
                ...state, 
                assetChange: payload
            };

        case types.FETCH_ASSETS:
            return{
                ...state,
                payload
            };

        case types.DELETE_ASSET:
            return state;
            
        default:
            return state;
    }
};

export default AssetReducer;
