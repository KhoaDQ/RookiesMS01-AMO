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

const CreateAssignment = () => {
  const admin = useSelector((state) => state.oidc.user);

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

  const disableButton =
    form.asset !== '' && form.assignTo && form.assignDate && form.note !== '';

  const schema = yup.object().shape({});

  const dispatch = useDispatch();
  dispatch({ type: ac.CHANGE_INDEX, payload: '/create-assignment' });
  const AssetReducer = useSelector((state) => state.AssetReducer);
  const UserReducer = useSelector((state) => state.UserReducer);

  const [assets, setAssets] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUser() {
      const res = await apiCaller('User', 'GET', null);
      if (res.data) {
        dispatch({
          type: 'FETCH_USER',
          payload: res.data,
        });
        setUsers(res.data);
      } else {
        return alert('You not permision to get data.');
      }
    }

    async function fetchAsset() {
      const res = await apiCaller('Asset', 'GET', null);

      if (res.status === 200) {
        dispatch({
          type: 'FETCH_ASSET',
          payload: res.data,
        });

        setAssets(res.data);
      }
    }

    fetchUser();
    fetchAsset();
  }, []);

  //console.log("asset", AssetReducer);

  const listUser =
    users &&
    users.length > 0 &&
    users.map((user, index) => {
      return (
        <option value={user.id}>{user.firstName + ' ' + user.lastName}</option>
      );
    });

  const listAsset =
    assets &&
    assets.length > 0 &&
    assets.map((asset, index) => {
      return <option value={asset.id}>{asset.name}</option>;
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (e) => {
    // e.preventDefault();
    console.log(users);
    async function CreateAssignment() {
      const res = await apiCaller('Assignment', 'POST', {
        AdminID: admin.profile.sub,
        UserID: form.assignTo,
        AssetID: form.asset,
        AssignedDate: moment(form.assignDate).toDate(),
        Note: form.note,
        AssignedTo: users.find((user) => user.id === form.assignTo).userName,
        AssignedBy: admin.profile.userName,
      });

      if (res.data) {
        dispatch({ type: action.CREATE_ASSIGNMENT, payload: res.data });

        history.push('/manage-assignment');
      }
    }

    try {
      CreateAssignment();
      //setIsModalOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const findNameAsset = (assetId) => {
    const asset = assets.find((asset) => asset.id === assetId);

    return asset?.name || '';
  };

  const findNameUser = (userId) => {
    const user = users.find((user) => user.id === userId);

    return user?.firstName + ' ' + user?.lastName || '';
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
            {/* <select
              className="custom-select custom-select-lg mb-3"
              className="form-control"
              value={form.assignTo}
              name="assignTo"
              onChange={(e) => setForm({ ...form, assignTo: e.target.value })}
              required={true}
            >
              <option value={0} defaultChecked>
                Select User
              </option>
              {listUser}
            </select> */}
            <InputGroup>
              <Input value={findNameUser(form.assignTo)} />
              <InputGroupAddon
                addonType="append"
                onClick={() => setIsModalShow(1)}
              >
                <Button color="secondary">To the Right!</Button>
              </InputGroupAddon>
              <ModalPickUser
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
            {/* <select
              className="custom-select custom-select-lg mb-3"
              className="form-control"
              value={form.asset}
              name="asset"
              onChange={(e) => setForm({ ...form, asset: e.target.value })}
              required={true}
            >
              <option value={0} defaultChecked>
                Select Asset
              </option>
              {listAsset}
            </select> */}
            <InputGroup>
              <Input value={findNameAsset(form.asset)} />
              <InputGroupAddon
                addonType="append"
                onClick={() => setIsModalAsset(1)}
              >
                <Button color="secondary">To the Right!</Button>
              </InputGroupAddon>
              <ModalPickAsset
                setState={setForm}
                assets={assets}
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
    </div>
  );
};
export default CreateAssignment;
