import callApi from "../../apis/callApi";
import { Method } from "../../constants/config";
import { FETCH_ROLES } from "./ActionType";

export const GetAllRolesAction = () => async (dispatch) => {
    const res = await callApi(`role`, Method.Get);
    dispatch({ type: FETCH_ROLES, payload: res ? res.data : []});
};