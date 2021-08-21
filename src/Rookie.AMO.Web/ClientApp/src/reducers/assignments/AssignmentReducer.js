import *as types from "../../actions/ManagerAssignment/ActionType.js";

const initialState = [];

function AssignmentReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case types.CREATE_ASSIGNMENT:
            return {...state, payload};

        case types.FETCH_ASSIGNMENTS:
            return payload;
        
        case types.GET_ASSIGNMENT_BY_ID:
            return payload;

        case types.DELETE_ASSIGNMENT:
            return {...state};
        default:
            return state;
    }
};

export default AssignmentReducer;
