import React, { useState, useEffect } from "react";
import "./Popup.css";

const PopupReturnRequest = (props) => {
  
  const [isModalOpen, setIsModalOpen] = useState(props.isModalOpen);

  useEffect(() => {
    setIsModalOpen(props.isModalOpen);
  });

  const handleCancel = () => {
    setIsModalOpen(false);
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
                Do you want to create a returning request for this asset?
              </p>
              <div className="auth-form__action">
                <button onClick={()=>{props.handleRequest()}} className="btn-accept">Yes</button>
                <button onClick={()=>{handleCancel()}} className="btn-cancel">
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupReturnRequest;
