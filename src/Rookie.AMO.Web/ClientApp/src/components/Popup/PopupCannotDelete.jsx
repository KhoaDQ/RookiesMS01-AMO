import React, { useState, useEffect } from "react";
import { AiOutlineCloseSquare } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import "./Popup.css";

const PopupCannotDelete = (props) => {
  let {idAsset} = props
  
  const [isModalOpen, setIsModalOpen] = useState(props.isModalOpen);

  useEffect(() => {
    setIsModalOpen(props.isModalOpen);
  });

  const handleCancel = () => {
    setIsModalOpen(false);
    props.handleModelShow(!isModalOpen);
  };

  return (
<div className="popup">
      <div
        className={'modal ' + (isModalOpen ? 'modal__open' : 'modal__close')}
      >
        <div className="modal__overlay"></div>

        <div className="modal__body">
          <div className="auth-form">
            <div className="auth-form__header">
              <div className="row">
                <div className="col-md-8">
                  <p className="auth-form__question">Cannot Delete Asset</p>
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
              <p className="auth-form__heading">
                Cannot delete the asset because it belongs to one or more historical assignments.
                If the asset is not able to be used anymore, please update its state in 
                <Link to = {`/edit-assets/${idAsset}`}> Edit Asset page</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupCannotDelete;
