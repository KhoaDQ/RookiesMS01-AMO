import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./Popup.css";
import { AiOutlineCloseSquare } from "react-icons/ai";
import AssetList from "../Asset/AssetList";
import { Table } from "reactstrap";
const PopupDetailAsset = (props) => {

  let {asset} = props;

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsModalOpen(props.isModalOpen);
  });

  const handleCancel = () => {
    setIsModalOpen(false);
    props.handleModelShow(!isModalOpen);
  };

  return (
    <div className="popupdetail_asset popupdetail popup">
      <div class={"modal " + (isModalOpen ? "modal__open" : "modal__close")}>
        <div className="modal__overlay"></div>

        <div className="modal__body">
          <div className="auth-form">
            <div className="auth-form__header">
              <div className="row">
                <div className="col-md-8">
                  <p className="auth-form__question">Detailed Asset Information</p>
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
                  <div className="col-md-3">Asset Code</div>
                  <div className="col-md-9">{asset.code}</div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-3">Asset Name</div>
                  <div className="col-md-9">{asset.name}</div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-3">Category</div>
                  <div className="col-md-9">{asset.categoryName}</div>
                </div>
                <div className="row">
                  <div className="col-md-3">Installed Date</div>
                  <div className="col-md-9">{asset.installedDate}</div>
                </div>
                <div className="row">
                  <div className="col-md-3">State</div>
                  <div className="col-md-9">{asset.state}</div>
                </div>
                <div className="row">
                  <div className="col-md-3">Location</div>
                  <div className="col-md-9">{asset.location}</div>
                </div>
                <div className="row">
                  <div className="col-md-3">Specification</div>
                  <div className="col-md-9">{props.specification}</div>
                </div>
                <div className="row">
                  <div className="col-md-3">History</div>
                  <div className="col-md-9">
                    <Table hover="true">
                        <thead>
                            <th>Date</th>
                            <th>Assigned By</th>
                            <th>Assigned To</th>
                            <th>Returned Date</th>
                        </thead>
                        <tbody></tbody>
                    </Table>
                </div>
                </div>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupDetailAsset;
