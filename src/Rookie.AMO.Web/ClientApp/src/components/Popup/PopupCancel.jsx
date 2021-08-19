import React, { useState, useEffect } from 'react';
import './Popup.css';

const PopupCancel = (props) => {
  let { handleCancel } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsModalOpen(props.isModalOpen);
  }, [props.isModalOpen]);

  const handleCancelP = () => {
    setIsModalOpen(false);
    props.handleModelShow(!isModalOpen);
  };

  return (
    <div>
      <div
        className={'modal ' + (isModalOpen ? 'modal__open' : 'modal__close')}
      >
        <div className="modal__overlay"></div>

        <div className="modal__body">
          <div className="auth-form">
            <div className="auth-form__header">
              <p className="auth-form__question">Are you sure?</p>
            </div>

            <div className="auth-form__body">
              <p className="auth-form__heading">
                Do you want to cancel this returning request?
              </p>
              <div className="auth-form__action">
                <button onClick={handleCancel} className="btn-accept">
                  Yes
                </button>
                <button onClick={handleCancelP} className="btn-cancel">
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

export default PopupCancel;
