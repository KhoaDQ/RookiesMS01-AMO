import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import apiCaller from "../../../apis/CallerApi";
import * as action from "../../../actions/ManageUser/ActionType";
import PopupInfor from "../../../components/Popup/PopupInfor";

const EditUser = (props) => {
  const user = {
    FirstName: "ABCFirstName",
    LastName: "ABCLastName",
    DateofBirth: "1999-11-30",
    Gender: "Male",
    Type: "Admin",
    JoinedDate: "2021-11-30",
  };
  const [currentUser, setCurrentUser] = useState(user);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  //const user = useSelector(state => state.user)
  // const dispatch = useDispatch()

  // useEffect(() => {
  //   async function fetchUserById() {
  //     const res = await apiCaller('users', 'GET', null);
  //     dispatch({ type: action.FETCH_USERS, payload: res });
  //   }
  //   fetchUserById()
  // }, [])
  // console.log(user);

  //   async function fetchUpdateUser() {
  //     const res = await apiCaller('users', 'PUT', null);
  //     dispatch({ type: action.FETCH_USERS, payload: res });
  //   }
  //   fetchUserById()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser({ ...currentUser, Gender: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(currentUser);
    setIsModalOpen(true);
  };

  const handleModelShowFunction = (content) => {
    setIsModalOpen(content);
  };

  return (
    <div>
      <h5 className="right-title">Edit User</h5>
      <form onSubmit={handleSubmit}>
        <div className="form-group row">
          <label
            htmlFor="FirstNameEditUser"
            className="col-sm-2 col-form-label"
          >
            First Name
          </label>
          <div className="col-sm-10" className="resize">
            <input
              type="text"
              className="form-control"
              id="FirstName"
              name="FirstName"
              defaultValue={user.FirstName}
              placeholder="FirstName"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <br></br>
        <div className="form-group row">
          <label htmlFor="LastNameEditUser" className="col-sm-2 col-form-label">
            Last Name
          </label>
          <div className="col-sm-10" className="resize">
            <input
              type="text"
              className="form-control"
              id="LastName"
              name="LastName"
              defaultValue={user.LastName}
              placeholder="LastName"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <br></br>
        <div className="form-group row">
          <label
            htmlFor="DateofBirthEditUser"
            className="col-sm-2 col-form-label"
          >
            Date of Birth
          </label>
          <div className="col-sm-10" className="resize">
            <input
              type="date"
              className="form-control "
              id="DateofBirth"
              name="DateofBirth"
              defaultValue={user.DateofBirth}
              placeholder="DateofBirth"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <br></br>
        <fieldset className="form-group" id="Gender">
          <div className="row">
            <legend className="col-form-label col-sm-2 pt-0">Gender</legend>
            <div className="col-sm-10">
              <div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="Gender"
                    id="gridRadios1"
                    value="Female"
                    defaultChecked={user.Gender === "Female"}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                  <label className="form-check-label" htmlFor="gridRadios1">
                    Female
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="Gender"
                    id="gridRadios2"
                    value="Male"
                    defaultChecked={user.Gender === "Male"}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                  <label className="form-check-label" htmlFor="gridRadios2">
                    Male
                  </label>
                </div>
              </div>
            </div>
          </div>
        </fieldset>
        <br></br>
        <div className="form-group row">
          <label
            htmlFor="JoinedDateEditUser"
            className="col-sm-2 col-form-label"
          >
            Joined Date
          </label>
          <div className="col-sm-10" className="resize">
            <input
              type="date"
              className="form-control "
              id="JoinedDate"
              name="JoinedDate"
              defaultValue={user.JoinedDate}
              placeholder="JoinedDate"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <br></br>
        <div className="form-group row">
          <label htmlFor="TypeEditUser" className="col-sm-2 col-form-label">
            Type
          </label>
          <div className="col-sm-10" className="resize">
            <select
              name="Type"
              className="custom-select custom-select-lg mb-3"
              className="form-control"
              defaultValue={user.Type}
              onChange={handleInputChange}
            >
              <option value={0}></option>
              <option value="Staff">Staff</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
        </div>
        <br></br>

        <button type="submit" className="btn btn-outline-danger margin color">
          Save
        </button>
        <button type="button" className="btn btn-outline-danger color1">
          <Link to="/manage-user">Cancel</Link>
        </button>
      </form>
      <PopupInfor
        title="Information"
        content="Edit user successfully"
        handleModelShow={handleModelShowFunction}
        isModalOpen={isModalOpen}
      ></PopupInfor>
    </div>
  );
};
export default EditUser;
