import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useDispatch, useSelector } from "react-redux";
import apiCaller from "../../../apis/apiCaller";
import * as action from "../../../actions/ManageUser/ActionType";
import PopupInfor from "../../../components/Popup/PopupInfor";

const date = new Date();

const schema = yup.object().shape({
  FirstName: yup.string().required(),
  LastName: yup.string().required(),

  DateofBirth: yup
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

  JoinedDate: yup
    .date()
    .required()
    .min(
      yup.ref("DateofBirth"),
      "Joined date is not later than Date of Birth. Please select a different date"
    ),
});

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

  const user = useSelector((state) => state.editUserReducer);
  const dispatch = useDispatch();

  //htttps://localhost:5011/api/users/{id}
  useEffect(() => {
    async function fetchUserById() {
      const res = await apiCaller(`users/${props.id}`, "GET", null);
      dispatch({ type: action.GETBYID_USER, payload: res.data });
    }
    fetchUserById();
    console.log(user);
  }, []);

  //htttps://localhost:5011/api/users
  async function fetchUpdateUser() {
    const res = await apiCaller("users", "PUT", currentUser);
    dispatch({ type: action.UPDATE_USER, payload: res.data });
    console.log(user);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser({ ...currentUser, Gender: value });
  };

  const submitForm = (data) => {
    console.log(data);
    console.log(currentUser);
    fetchUpdateUser();
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
              {...register("FirstName")}
              type="text"
              className="form-control"
              id="FirstName"
              name="FirstName"
              defaultValue={user.FirstName}
              placeholder="FirstName"
              onChange={handleInputChange}
            />
            {errors.FirstName && (
              <p className="text-danger">{errors.FirstName.message} !</p>
            )}
          </div>
        </div>
        <br></br>
        <div className="form-group row">
          <label htmlFor="LastNameEditUser" className="col-sm-2 col-form-label">
            Last Name
          </label>
          <div className="col-sm-10" className="resize">
            <input
              {...register("LastName")}
              type="text"
              className="form-control"
              id="LastName"
              name="LastName"
              defaultValue={user.LastName}
              placeholder="LastName"
              onChange={handleInputChange}
            />
            {errors.LastName && (
              <p className="text-danger">{errors.LastName.message} !</p>
            )}
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
              {...register("DateofBirth")}
              type="date"
              className="form-control "
              id="DateofBirth"
              name="DateofBirth"
              defaultValue={user.DateofBirth}
              placeholder="DateofBirth"
              onChange={handleInputChange}
            />
            {errors.DateofBirth && (
              <p className="text-danger">{errors.DateofBirth.message} !</p>
            )}
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
              {...register("JoinedDate")}
              type="date"
              className="form-control "
              id="JoinedDate"
              name="JoinedDate"
              defaultValue={user.JoinedDate}
              placeholder="JoinedDate"
              onChange={handleInputChange}
            />
            {errors.JoinedDate && (
              <p className="text-danger">{errors.JoinedDate.message} !</p>
            )}
            {(new Date(currentUser.JoinedDate).getDay() == 6 ||
              new Date(currentUser.JoinedDate).getDay() == 0) && (
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

        <button
          type="submit"
          disabled={
            !(
              currentUser.FirstName &&
              currentUser.LastName &&
              currentUser.Gender &&
              currentUser.Type &&
              currentUser.DateofBirth &&
              currentUser.JoinedDate
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
      ></PopupInfor>
    </div>
  );
};
export default EditUser;
