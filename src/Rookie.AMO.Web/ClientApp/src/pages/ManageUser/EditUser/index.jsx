import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import moment, { isMoment } from "moment";

import { useDispatch, useSelector } from "react-redux";
import apiCaller from "../../../apis/callApi";
import * as action from "../../../actions/ManageUser/ActionType";
import PopupInfor from "../../../components/Popup/PopupInfor";

const date = new Date();

const schema = yup.object().shape({
  dateOfBirth: yup
    .date()
    .required()
    .max(
      (date.getFullYear() - 18).toString() +
        "/" +
        date.getMonth() +
        "/" +
        date.getDate(),
      "User is under 18. Please select a different date"
    ),

  joinedDate: yup
    .date()
    .required()
    .min(
      yup.ref("dateOfBirth"),
      "Joined date is not later than Date of Birth. Please select a different date"
    ),
});

const EditUser = (props) => {
  const [currentUser, setCurrentUser] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const result = FetchUser(props.match.params.id);
  useEffect(() => {
    setCurrentUser(result);
  }, [result]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser({ ...currentUser, gender: value });
  };

  const submitForm = (data) => {
    FetchCurrentUser(props.match.params.id, currentUser);
    //console.log(response);
    setIsModalOpen(true);
  };

  const handleModelShowFunction = (content) => {
    setIsModalOpen(content);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  return (
    <div>
      <h5 className="right-title">Edit User</h5>
      <form onSubmit={handleSubmit(submitForm)}>
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
              id="firstName"
              name="firstName"
              value={currentUser.firstName}
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
              id="lastName"
              name="lastName"
              value={currentUser.lastName}
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
              {...register("dateOfBirth")}
              className="form-control "
              id="dateOfBirth"
              name="dateOfBirth"
              value={moment(currentUser.dateOfBirth).format("YYYY-MM-DD")}
              placeholder="DateofBirth"
              onChange={handleInputChange}
            />
            {errors.dateOfBirth && (
              <p className="text-danger">{errors.dateOfBirth.message} !</p>
            )}
          </div>
        </div>
        <br></br>
        <fieldset className="form-group" id="gender">
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
                    checked={currentUser.gender === "Female"}
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
                    name="gender"
                    id="gridRadios2"
                    value="Male"
                    checked={currentUser.gender === "Male"}
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
              {...register("joinedDate")}
              type="date"
              className="form-control "
              id="joinedDate"
              name="joinedDate"
              value={moment(currentUser.joinedDate).format("YYYY-MM-DD")}
              placeholder="JoinedDate"
              onChange={handleInputChange}
            />
            {errors.joinedDate && (
              <p className="text-danger">{errors.joinedDate.message} !</p>
            )}
            {(new Date(currentUser.joinedDate).getDay() == 6 ||
              new Date(currentUser.joinedDate).getDay() == 0) && (
              <p className="text-danger">
                "Joined date is Saturday or Sunday. Please select a different
                date" !
              </p>
            )}
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
              value={currentUser.type}
              onChange={handleInputChange}
            >
              <option value={0}></option>
              <option value="Staff">Staff</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
        </div>
        <br></br>

        <button
          type="submit"
          disabled={
            !(
              currentUser.firstName &&
              currentUser.lastName &&
              currentUser.gender &&
              currentUser.type &&
              currentUser.dateOfBirth &&
              currentUser.joinedDate
            )
          }
          className="btn btn-outline-danger margin color"
        >
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
        pathReturn="/manage-user"
      ></PopupInfor>
    </div>
  );
};

function FetchUser(id) {
  const dispatch = useDispatch();
  //htttps://localhost:5011/api/users/{id}
  //15a9f5fd-00b9-4a55-b463-0fb7acdc6f88
  useEffect(() => {
    async function fetch() {
      let enpoint = `user/${id}`;
      console.log(enpoint);
      const res = await apiCaller(enpoint, "GET", null);
      dispatch({ type: action.GETBYID_USER, payload: res.data });
    }
    fetch();
  }, []);

  const result = useSelector((state) => state.EditUserReducer);
  return result;
}

function FetchCurrentUser(id, user) {
  //htttps://localhost:5011/api/users/{id}
  //15a9f5fd-00b9-4a55-b463-0fb7acdc6f88
  async function fetch() {
    let enpoint = `user/${id}`;
    const res = await apiCaller(enpoint, "PUT", user);
    return res;
  }
  return fetch();
}

export default EditUser;
