import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector, connect } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import moment from 'moment';

import apiCaller from '../../../apis/callApi';
import * as action from '../../../actions/ManagerAssignment/ActionType';
import * as ac from '../../../actions//IndexCom/ActionType';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { AiOutlineSearch } from '@react-icons/all-files/ai/AiOutlineSearch';

import {
  Row,
  Form,
  Col,
  FormGroup,
  Label,
  Input,
  FormText,
  InputGroup,
  InputGroupAddon,
} from 'reactstrap';
import ModalPickUser from '../../../components/Popup/ModalPickUser';
import { Button, ButtonToolbar } from 'react-bootstrap';
import ModalPickAsset from '../../../components/Popup/ModalPickAsset';
import PopupInfor from '../../../components/Popup/PopupInfor';

const CreateAssignment = () => {
  const admin = useSelector((state) => state.oidc.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalShow, setIsModalShow] = useState(0);
  const [isModalAsset, setIsModalAsset] = useState(0);

  const history = useHistory();

  const [form, setForm] = useState({
    asset: '',
    assignTo: '',
    assignBy: '',
    assignDate: moment().toDate(),
    note: '',
  });
  const [nameAsset, setNameAsset] = useState('');
  const [nameUser, setNameUser] = useState('');

  const disableButton =
    form.asset !== '' && form.assignTo && form.assignDate && form.note !== '';

  const schema = yup.object().shape({});

  const dispatch = useDispatch();
  dispatch({ type: ac.CHANGE_INDEX, payload: '/create-assignment' });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleModelShowFunction = (content) => {
    setIsModalOpen(content);
  };

  const onSubmit = (e) => {
    // e.preventDefault();
    async function CreateAssignment() {
      const res = await apiCaller('Assignment', 'POST', {
        AdminID: admin.profile.sub,
        UserID: form.assignTo,
        AssetID: form.asset,
        AssignedDate: moment(form.assignDate).toDate(),
        Note: form.note,
        AssignedTo: nameUser,
        AssignedBy: admin.profile.userName,
      });

      if (res.data) {
        dispatch({ type: action.CREATE_ASSIGNMENT, payload: res.data });
      }
      setIsModalOpen(true);
    }

    try {
      CreateAssignment();
      //setIsModalOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h5 className="right-title">Create New Assignment</h5>
      <form onSubmit={handleSubmit(onSubmit)}>
        <br></br>
        <div className="form-group row">
          <label htmlFor="inputUser" className="col-sm-2 col-form-label">
            User
          </label>
          <div className="col-sm-10" className="resize">
            <InputGroup>
              <Input value={nameUser} />
              <InputGroupAddon
                addonType="append"
                onClick={() => setIsModalShow(1)}
              >
                <Button className="btn-danger">
                  <AiOutlineSearch />
                </Button>
              </InputGroupAddon>
              <ModalPickUser
                setNameUser={setNameUser}
                setState={setForm}
                show={isModalShow}
                onHide={() => {
                  setIsModalShow(0);
                }}
              />
            </InputGroup>
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
            <InputGroup>
              <Input value={nameAsset} />
              <InputGroupAddon
                addonType="append"
                onClick={() => setIsModalAsset(1)}
              >
                <Button className="btn-danger">
                  <AiOutlineSearch />
                </Button>
              </InputGroupAddon>
              <ModalPickAsset
                setNameAsset={setNameAsset}
                setState={setForm}
                show={isModalAsset}
                onHide={() => {
                  setIsModalAsset(0);
                }}
              />
            </InputGroup>
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
              className="form-control"
              id="AssignedDate"
              name="AssignedDate"
              onChange={(e) => {
                const value = e.target?.value;

                setForm({
                  ...form,
                  assignDate: value,
                });
              }}
              value={moment(form.assignDate).format('YYYY-MM-DD')}
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
              onChange={(e) => setForm({ ...form, note: e.target.value })}
              value={form.note}
            />
          </div>
        </div>
        <br></br>

        <button
          type="submit"
          class="btn btn-outline-danger margin color"
          disabled={!disableButton}
        >
          Save
        </button>
        <button type="button" class="btn btn-outline-danger color1">
          <Link to="/manage-assignment">Cancel</Link>
        </button>
      </form>
      <PopupInfor
        title="Information"
        content="Create assignment successfully"
        handleModelShow={handleModelShowFunction}
        isModalOpen={isModalOpen}
        pathReturn="/manage-assignment"
      ></PopupInfor>
    </div>
  );
};
export default CreateAssignment;
