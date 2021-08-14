import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./Popup.css";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { Link } from "react-router-dom";

const PopupInfor = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsModalOpen(props.isModalOpen);
  });

  const handleCancel = () => {
    setIsModalOpen(false);
    props.handleModelShow(!isModalOpen);
  };

  return (
    <div className="popup">
      <div class={"modal " + (isModalOpen ? "modal__open" : "modal__close")}>
        <div className="modal__overlay"></div>

        <div className="modal__body">
          <div className="auth-form">
            <div className="auth-form__header">
              <div className="row">
                <div className="col-md-8">
                  <p className="auth-form__question">{props.title}</p>
                </div>

                <div className="col-md-3">
                  <Link to={props.pathReturn}>
                    <button className="close" onClick={handleCancel}>
                      <AiOutlineCloseSquare />
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="auth-form__body">
              <p className="auth-form__heading">{props.content}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupInfor;
