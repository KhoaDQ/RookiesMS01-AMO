import callApi from "../../apis/callApi";
import { BASE_URL, Method, RoleEndpoint} from "../../constants/config";
import { GetAllRolesFail, GetAllRolesRequest, GetAllRolesSuccess } from "../../constants/RoleConstants";

export const GetAllRoles = () => async (dispatch) => {
    try {
        dispatch({ type: GetAllRolesRequest });
        const data = await callApi(`${BASE_URL}${RoleEndpoint}`, Method.Get);
        dispatch({ type: GetAllRolesSuccess, payload: data });
    } catch (error) {
        dispatch({ type: GetAllRolesFail, payload: error.message });
    }
};