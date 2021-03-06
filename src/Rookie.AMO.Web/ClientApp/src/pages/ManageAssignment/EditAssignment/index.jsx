import React, { useState, useEffect } from "react";

import { useDispatch, useSelector, connect } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import moment from "moment";

import apiCaller from "../../../apis/callApi";
import * as action from "../../../actions/ManagerAssignment/ActionType";
import {
  Button,
  Row,
  Form,
  Col,
  FormGroup,
  Label,
  Input,
  FormText,
  InputGroup,
  InputGroupAddon,
} from "reactstrap";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import ModalPickUser from "../../../components/Popup/ModalPickUser";
import ModalPickAsset from "../../../components/Popup/ModalPickAsset";
import * as ac from "../../../actions//IndexCom/ActionType";
import PopupInfor from "../../../components/Popup/PopupInfor";

const EditAssignment = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    id: "",
    asset: "",
    assignTo: null,
    assignBy: null,
    assignDate: moment().toDate(),
    note: "",
    state: "",
  });

  const disableButton =
    form.asset !== "" && form.assignTo && form.assignDate && form.note !== "";

  const schema = yup.object().shape({});

  const dispatch = useDispatch();
  dispatch({ type: ac.CHANGE_INDEX, payload: "/edit-assignments" });
  const AssetReducer = useSelector((state) => state.AssetReducer);
  const UserReducer = useSelector((state) => state.UserReducer);

  const [assets, setAssets] = useState([]);
  const [users, setUsers] = useState([]);

  const initAssignment = FetchAssignment(props.match.params.id);
  useEffect(() => {
    if (initAssignment) {
      setForm({
        id: initAssignment.id || "",
        asset: initAssignment.assetID || "",
        assignTo: initAssignment.userID || "",
        state: initAssignment.state,
        assignDate: moment(initAssignment.assignedDate).toDate(),
        note: initAssignment.note || "",
      });
    }
  }, [initAssignment]);

  useEffect(() => {
    async function fetchUser() {
      const res = await apiCaller("User", "GET", null);

      if (res.data) {
        dispatch({
          type: "FETCH_USER",
          payload: res.data,
        });
        setUsers(res.data);
      } else {
        return alert("You not permision to get data.");
      }
    }

    async function fetchAsset() {
      const res = await apiCaller("Asset", "GET", null);

      if (res.status === 200) {
        dispatch({
          type: "FETCH_ASSET",
          payload: res.data,
        });

        setAssets(res.data);
      }
    }

    fetchUser();
    fetchAsset();
  }, []);

  const handleModelShowFunction = (content) => {
    setIsModalOpen(content);
  };

  const listUser =
    users &&
    users.length > 0 &&
    users.map((user, index) => {
      return (
        <option value={user.id}>{user.firstName + " " + user.lastName}</option>
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

    async function EditAssignment() {
      const res = await apiCaller("Assignment/" + form.id, "PUT", {
        UserID: form.assignTo,
        AssetID: form.asset,
        AssignedDate: moment(form.assignDate).toDate(),
        Note: form.note,
        State: form.state,
      });

      if (res.data) {
        dispatch({ type: action.CREATE_ASSIGNMENT, payload: res.data });
      }

      setIsModalOpen(true);
    }

    try {
      EditAssignment();
      //setIsModalOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="row">
      <div className="col-8">
        <h5 className="right-title mb-5">Edit Assignment</h5>
        <form onSubmit={handleSubmit(onSubmit)}>
          <br></br>
          <div className="form-group row">
            <label htmlFor="inputUser" className="col-3 col-form-label">
              User
            </label>
            <div className="col-9 resize">
              <select
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
              </select>
              {/* <InputGroup>
              <Input />
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
            </InputGroup> */}
            </div>
          </div>
          <br></br>
          <div className="form-group row">
            <label
              htmlFor="inputcategoryAssets"
              className="col-sm-3 col-form-label"
            >
              Asset
            </label>
            <div className="col-sm-9 resize">
              <select
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
              </select>
              {/* <InputGroup>
              <Input />
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
            </InputGroup> */}
            </div>
          </div>
          <br></br>
          <div className="form-group row">
            <label htmlFor="installedDate" className="col-3 col-form-label">
              Assigned Date
            </label>
            <div className="col-9 resize">
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
                value={moment(form.assignDate).format("YYYY-MM-DD")}
              />
            </div>
          </div>
          <br></br>
          <div className="form-group row">
            <label
              htmlFor="specificationCategory"
              className="col-sm-3 col-form-label"
            >
              Note
            </label>
            <div className="col-sm-9 resize">
              <textarea
                type="text"
                className="form-control height"
                id="NoteAssignment"
                onChange={(e) => setForm({ ...form, note: e.target.value })}
                value={form.note}
              />
            </div>
          </div>
          <br></br>
          <div className="d-flex flex-row-reverse">
            <button
              type="button"
              className="btn btn-outline-danger margin color1"
            >
              <Link to="/manage-assignment">Cancel</Link>
            </button>
            <button
              type="submit"
              class="btn btn-outline-danger margin color"
              disabled={!disableButton}
            >
              Save
            </button>
          </div>
        </form>
        <PopupInfor
          title="Information"
          content="Edit assignment successfully"
          handleModelShow={handleModelShowFunction}
          isModalOpen={isModalOpen}
          pathReturn="/manage-assignment"
        ></PopupInfor>
      </div>
    </div>
  );
};

function FetchAssignment(id) {
  const dispatch = useDispatch();
  //htttps://localhost:5011/api/users/{id}
  //15a9f5fd-00b9-4a55-b463-0fb7acdc6f88
  useEffect(() => {
    async function fetch() {
      let endpoint = `Assignment/${id}`;
      //console.log(endpoint);
      const res = await apiCaller(endpoint, "GET", null);

      if (res.status === 200) {
        dispatch({ type: action.FETCH_ASSIGNMENTS, payload: res.data });
      }
    }
    fetch();
  }, []);

  const result = useSelector((state) => state.AssignmentReducer);
  return result;
}

export default EditAssignment;
