import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./Popup.css";
import { AiOutlineCloseSquare } from "react-icons/ai";
import AssetList from "../Asset/AssetList";
import { Container, Row, Col, Table } from 'reactstrap';

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
              <Container>
                <Row>
                  <Col xs="3">Asset Code</Col>
                  <Col xs="9">{asset.code}</Col>
                </Row>
                <Row>
                <Col xs="3">Asset Name</Col>
                <Col xs="9">{asset.name}</Col>
                </Row>
                <Row>
                <Col xs="3">Category</Col>
                <Col xs="9">{asset.categoryName}</Col>
                </Row>
                <Row>
                <Col xs="3">Installed Date</Col>
                <Col xs="9">{asset.installedDate}</Col>
                </Row>
                <Row>
                <Col xs="3">State</Col>
                <Col xs="9">{asset.state}</Col>
                </Row>
                <Row>
                <Col xs="3">Location</Col>
                <Col xs="9">{asset.location}</Col>
                </Row>
                <Row>
                <Col xs="3">Specification</Col>
                <Col xs="9">{asset.specification}</Col>
                </Row>
                <Row>
                <Col xs="3">History</Col>
                <Col xs="9" className="table_history_container">
                    <Table className="table_history_assigned table_border_spacing">
                        <thead>
                            <th>Date</th>
                            <th>Assigned By</th>
                            <th>Assigned To</th>
                            <th>Returned Date</th>
                        </thead>
                        <tbody></tbody>
                    </Table>
                    </Col>
                </Row>
              </Container>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupDetailAsset;
