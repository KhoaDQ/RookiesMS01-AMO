import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./Popup.css";

const PopupDelete = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsModalOpen(props.isModalOpen);
  });

  const handleCancel = () => {
    setIsModalOpen(false);
    props.handleModelShow(!isModalOpen);
  };

  return (
    <div>
      <div class={"modal " + (isModalOpen ? "modal__open" : "modal__close")}>
        <div className="modal__overlay"></div>

        <div className="modal__body">
          <div className="auth-form">
            <div className="auth-form__header">
              <p className="auth-form__question">Are you sure?</p>
              {/* <p className="auth-form__question">{props.header}</p> */}
            </div>

            <div className="auth-form__body">
              <p className="auth-form__heading">
                Do you want to delete this asset?
                {/* {props.heading} */}
              </p>
              <div className="auth-form__action">
                <button className="btn-accept">Delete</button>
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

export default PopupDelete;
