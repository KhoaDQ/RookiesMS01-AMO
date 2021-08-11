import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { CreateUserAction } from "../../../actions/ManageUser/CreateUserAction";
import callApi from "../../../apis/apiCaller";
import { Method, UserEndpoint } from "../../../constants/config";
import { GetAllRolesRequest } from "../../../constants/RoleConstants";

const CreateUser = () => {
  const dispatch = useDispatch();
  //const { user } = useSelector(state => state.oidc);
  const { roles } = useSelector(state => state.GetAllRoles);
  const roleOptions = roles.map((role) => (<option value={role.name}>{role.name}</option>));
  const initUser = {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    joinedDate: "",
    gender: "Female",
    type: "",
    location: ""
  };
  const [newUser, setNewUser] = useState(initUser);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(CreateUserAction(newUser));
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewUser({ ...newUser, [name]: value });
  };

  useEffect(() => {
    async function GetAllRoles(){
      const res = await callApi(UserEndpoint, Method.Get, null);
      dispatch({ type: GetAllRolesRequest, payload: res })
    }
    return () => {
      
    }
  }, [])

  return (
    <div>
      <h5 className="right-title">Create User</h5>
      <form onSubmit={handleSubmit}>
        <div className="form-group row">
          <label
            htmlFor="FirstNameEditUser"
            className="col-sm-2 col-form-label"
          >
            First Name
          </label>
          <div className="col-sm-10 resize">
            <input
              type="text"
              className="form-control"
              id="firstName"
              name="firstName"
              value={newUser.firstName}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <br></br>
        <div className="form-group row">
          <label htmlFor="LastNameEditUser" className="col-sm-2 col-form-label">
            Last Name
          </label>
          <div className="col-sm-10 resize">
            <input
              type="text"
              className="form-control"
              id="lastName"
              name="lastName"
              value={newUser.lastName}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <br></br>
        <div className="form-group row">
          <label
            htmlFor="DateOfBirthEditUser"
            className="col-sm-2 col-form-label"
          >
            Date of Birth
          </label>
          <div className="col-sm-10 resize">
            <input
              type="date"
              className="form-control "
              id="dateOfBirth"
              name="dateOfBirth"
              value={newUser.dateOfBirth}
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
                    name="gender"
                    id="gridRadios1"
                    value="Female"
                    checked={newUser.gender === "Female"}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label" htmlFor="gridRadios1">
                    Female
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    id="gridRadios2"
                    value="Male"
                    checked={newUser.gender === "Male"}
                    onChange={handleInputChange}
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
          <div className="col-sm-10 resize">
            <input
              type="date"
              className="form-control "
              id="joinedDate"
              name="joinedDate"
              value={newUser.joinedDate}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <br></br>
        <div className="form-group row">
          <label htmlFor="TypeEditUser" className="col-sm-2 col-form-label">
            Type
          </label>
          <div className="col-sm-10 resize">
            <select
              name="type"
              className="custom-select custom-select-lg mb-3 form-control"
              defaultValue={"Staff"}
              onChange={handleInputChange}
            >
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
    </div>
  );
};
export default CreateUser;
