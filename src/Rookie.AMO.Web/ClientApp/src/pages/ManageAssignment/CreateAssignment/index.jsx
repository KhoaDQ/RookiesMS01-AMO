import React, { useEffect, useState } from 'react';
import { Row, Form, Col, FormGroup, Label, Input, FormText } from 'reactstrap';
import ModalPickUser from '../../../components/Popup/ModalPickUser';
import { Button, ButtonToolbar } from 'react-bootstrap';
const CreateAssignment = () => {
  const [isModalShow, setIsModalShow] = useState(0);
  return (
    <div>
      <h5 className="right-title">Create New Assignment</h5>
      <form>
        <div className="form-group row">
          <label htmlFor="inputUser" className="col-sm-2 col-form-label">
            User
          </label>
          <div className="col-sm-10" className="resize">
            <input type="text" className="form-control" id="inputUser" />
            <ButtonToolbar>
              <Button variant="primary" onClick={() => setIsModalShow(1)}>
                Pick
              </Button>

              <ModalPickUser
                show={isModalShow}
                onHide={() => {
                  setIsModalShow(0);
                }}
              />
            </ButtonToolbar>
          </div>
        </div>
        <br></br>
        <div className="form-group row">
          <label
            htmlFor="inputcategoryAssets"
            className="col-sm-2 col-form-label"
          >
            Asset
          </label>
          <div className="col-sm-10" className="resize">
            <input
              type="text"
              className="form-control"
              id="inputcategoryAssets"
            />
          </div>
        </div>
        <br></br>
        <div className="form-group row">
          <label htmlFor="installedDate" className="col-sm-2 col-form-label">
            Assigned Date
          </label>
          <div className="col-sm-10" className="resize">
            <input
              type="date"
              className="form-control "
              id="AssignedDate"
              name="AssignedDate"
            />
          </div>
        </div>
        <br></br>
        <div className="form-group row">
          <label
            htmlFor="specificationCategory"
            className="col-sm-2 col-form-label"
          >
            Note
          </label>
          <div className="col-sm-10" className="resize">
            <input
              type="text"
              className="form-control height"
              id="NoteAssignment"
            />
          </div>
        </div>
        <br></br>

        <button type="button" class="btn btn-outline-danger margin color">
          Save
        </button>
        <button type="button" class="btn btn-outline-danger color1">
          Cancel
        </button>
      </form>
    </div>
  );
};
export default CreateAssignment;
