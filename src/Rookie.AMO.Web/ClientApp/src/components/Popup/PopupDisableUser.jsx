import React, { useState, useEffect } from "react";
import "./Popup.css";

const PopupDisableUser = (props) => {
  let {handleDelete} = props
  
  const [isModalOpen, setIsModalOpen] = useState(props.isModalOpen);

  useEffect(() => {
    setIsModalOpen(props.isModalOpen);
  });

  const handleCancel = () => {
    setIsModalOpen(false);
    props.handleModelShow(!isModalOpen);
  };

  return (
    <div>
      <div className={"modal " + (isModalOpen ? "modal__open" : "modal__close")}>
        <div className="modal__overlay"></div>
        <div className="modal__body">
          <div className="auth-form">
            <div className="auth-form__header">
              <p className="auth-form__question">Are you sure?</p>
            </div>

            <div className="auth-form__body">
              <p className="auth-form__heading">
                Do you want to disable this user?
              </p>
              <div className="auth-form__action">
                <button onClick={handleDelete} className="btn-accept">Disable</button>
                <button onClick={handleCancel} className="btn-cancel">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupDisableUser;
