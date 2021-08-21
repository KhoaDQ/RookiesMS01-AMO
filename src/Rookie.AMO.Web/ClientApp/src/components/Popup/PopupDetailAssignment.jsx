import React, { useState, useEffect } from "react";
import "./Popup.css";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { format } from 'date-fns';

const PopupDetail = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { assignment } = props

  useEffect(() => {
    setIsModalOpen(props.isModalOpen);
  });

  const handleCancel = () => {
    setIsModalOpen(false);
    props.handleModelShow(!isModalOpen);
  };

  let value = new Date(assignment.assignedDate)
  const assignedDate = format(value, 'dd/MM/yyyy')
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
                  <div className="col-md-4">Asset Code</div>
                  <div className="col-md-8">{assignment.assetCode}</div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-4">Asset Name</div>
                  <div className="col-md-8">{assignment.assetName}</div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-4">Specification</div>
                  <div className="col-md-8">{assignment.specification}</div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-4">Assigned To</div>
                  <div className="col-md-8">{assignment.assignedTo}</div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-4">Assigned By</div>
                  <div className="col-md-8">{assignment.assignedBy}</div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-4">Assigned Date</div>
                  <div className="col-md-8">{assignedDate}</div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-4">State</div>
                  <div className="col-md-8">{assignment.state}</div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-4">Note</div>
                  <div className="col-md-8">{assignment.note}</div>
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
