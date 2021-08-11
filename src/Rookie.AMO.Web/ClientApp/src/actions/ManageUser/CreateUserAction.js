import callApi from "../../apis/apiCaller";
import { BASE_URL, Method, UserEndpoint } from "../../constants/config";
import { CreateUserFail, CreateUserRequest, CreateUserSuccess } from "../../constants/UserConstants";

export const CreateUserAction = (user) => async (dispatch) => {
    try {
        dispatch({ type: CreateUserRequest, payload: user });
        const data = await callApi(`${BASE_URL}${UserEndpoint}`, Method.Post, user);
        dispatch({ type: CreateUserSuccess, payload: data });
    } catch (error) {
        dispatch({ type: CreateUserFail, payload: error.message });
    }
};