import axios from "axios";
import * as Config from "../constants/config";
export default function callApi(endpoint, method, body) {
  let token = localStorage.getItem("access_token");

  if (token === null)
    return axios({
      method: method,
      url: `${Config.API_URL}/${endpoint}`,
      data: body,
    }).catch((err) => console.log(err));
  else {
    let auToken = `Bearer ${token}`;
    return axios({
      method: method,
      url: `${Config.API_URL}/${endpoint}`,
      headers: { Authorization: auToken },
      data: body,
    }).catch((err) => console.log(err));
  }
}
