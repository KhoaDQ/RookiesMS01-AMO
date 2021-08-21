import React, { useState, useEffect } from "react";
import "./Popup.css";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { format } from 'date-fns';

const PopupDetail = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = props

  useEffect(() => {
    setIsModalOpen(props.isModalOpen);
  });

  const handleCancel = () => {
    setIsModalOpen(false);
    props.handleModelShow(!isModalOpen);
  };

  let value = new Date(user.joinedDate)
  const joinedDate = format(value, 'dd/MM/yyyy')
  value = new Date(user.dateOfBirth)
  const dateOfBirth = format(value, 'dd/MM/yyyy')
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
                <div className="row mt-3">
                  <div className="col-md-4">Staff Code</div>
                  <div className="col-md-8">{user.codeStaff}</div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-4">Full Name</div>
                  <div className="col-md-8">{user.fullName}</div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-4">Username</div>
                  <div className="col-md-8">{user.userName}</div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-4">Date of Birth</div>
                  <div className="col-md-8">{dateOfBirth}</div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-4">Gender</div>
                  <div className="col-md-8">{user.gender}</div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-4">Joined Date</div>
                  <div className="col-md-8">{joinedDate}</div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-4">Type</div>
                  <div className="col-md-8">{user.type}</div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-4">Location</div>
                  <div className="col-md-8">{user.location}</div>
                </div>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupDetail;
