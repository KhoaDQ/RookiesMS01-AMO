import React, { useState, useEffect } from "react";
import "./Popup.css";
import { AiOutlineCloseSquare } from "react-icons/ai";

const PopupDetail = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { content } = props

  useEffect(() => {
    setIsModalOpen(props.isModalOpen);
  });

  const handleCancel = () => {
    setIsModalOpen(false);
    props.handleModelShow(!isModalOpen);
  };

  const elements = Object.keys(content).map(function (key) {
    if (key !== 'id') {
      key.charAt(0).toUpperCase();
      const temp = key.replace(/([A-Z])/g, " $1")
      const property = temp.charAt(0).toUpperCase() + temp.slice(1);
      return (
        <div className="row mt-3" key={key}>
          <div className="col-md-4">{property}: </div>
          <div className="col-md-8">{content[key]}</div>
        </div>
      )
    }
  })
  return (
    <div className="popupdetail popup">
      <div className={"modal " + (isModalOpen ? "modal__open" : "modal__close")}>
        <div className="modal__overlay"></div>

        <div className="modal__body">
          <div className="auth-form">
            <div className="auth-form__header">
              <div className="row">
                <div className="col-md-8">
                  <p className="auth-form__question">{props.title}</p>
                </div>

                <div className="col-md-3">
                  <button className="close" onClick={handleCancel}>
                    <AiOutlineCloseSquare />
                  </button>
                </div>
              </div>
            </div>

            <div className="auth-form__body">
              <p className="auth-form__heading">
                {elements}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupDetail;
