import React from "react";
import userManager from "../../utils/userManager";

export default function PopupRedirect(props) {
  const { isModalOpen, setIsModalOpen } = props;
  return (
    <div className="popup">
      <div
        className={"modal " + (isModalOpen ? "modal__open" : "modal__close")}
      >
        <div className="modal__overlay"></div>

        <div className="modal__body">
          <div className="auth-form">
            <div className="auth-form__header">
              <div className="row">
                <div className="col-md-8">
                  <p className="auth-form__question">Redirect To Login</p>
                </div>
              </div>
            </div>

            <div className="auth-form__body">
              <div className="auth-form__heading">
                <div className="row">
                  <p>You haven't logged in. Press button to redirect</p>
                </div>
                <div className="row">
                  <button
                    className="btn btn-outline-danger margin color"
                    onClick={() => userManager.signinRedirect()}
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
