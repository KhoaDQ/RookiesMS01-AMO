import callApi from "../../apis/callApi";
import { Method, UserEndpoint } from "../../constants/config";
import { CREATE_USER } from "./ActionType";

export const CreateUserAction = (user, setErrorOpen, setSuccessOpen) => async (dispatch) => {
    const res = await callApi(`user`, Method.Post, user);
    if (res == null) {
        setErrorOpen();
    } else {
        setSuccessOpen();
        dispatch({ type: CREATE_USER, payload: res.data });
    }
};