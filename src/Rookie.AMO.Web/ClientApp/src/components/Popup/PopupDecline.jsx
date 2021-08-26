import React, { useState, useEffect } from 'react';
import './Popup.css';

const PopupComplete = (props) => {
  let { handleComplete } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsModalOpen(props.isModalOpen);
  }, [props.isModalOpen]);

  const handleCancel = () => {
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
                Do you want to decline this assignment? 
              </p>
              <div className="auth-form__action">
                <button onClick={handleComplete} className="btn-accept">
                  Decline
                </button>
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

export default PopupComplete;
