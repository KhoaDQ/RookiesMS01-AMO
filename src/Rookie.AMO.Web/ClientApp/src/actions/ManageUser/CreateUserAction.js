import callApi from "../../apis/callApi";
import { Method, UserEndpoint } from "../../constants/config";
import { CREATE_USER } from "./ActionType";

export const CreateUserAction = (user) => async (dispatch) => {
    const res = await callApi(`user`, Method.Post, user);
    dispatch({ type: CREATE_USER, payload: res.data });
};