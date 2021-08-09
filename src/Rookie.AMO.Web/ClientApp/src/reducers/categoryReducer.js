import *as types from "../actions/ManageCategory/ActionType";

const initialState = [];

function categoryReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {

        case types.FETCH_CATEGORIES:
            return payload.data;
            
        default:
            return state;
    }
};

export default categoryReducer;