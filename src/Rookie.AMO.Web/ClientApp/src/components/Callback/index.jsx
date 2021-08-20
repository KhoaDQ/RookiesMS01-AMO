import React from "react";
import userManager from "../../utils/userManager";
import { CallbackComponent } from "redux-oidc";
import { useHistory } from "react-router";

export default function Callback() {
  const history = useHistory();

  return (
    <CallbackComponent
      userManager={userManager}
      successCallback={(res) => {
        localStorage.setItem("access_token", res.access_token);
        userManager
          .signinRedirectCallback({ response_mode: "query" })
          .then(history.push(""));
      }}
      errorCallback={(error) => history.push("")}
    >
      <div>Redirecting...</div>
    </CallbackComponent>
  );
}
