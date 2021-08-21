import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { CreateUserAction } from "../../../actions/ManageUser/CreateUserAction";
import { GetAllRolesAction } from "../../../actions/ManageUser/GetAllRolesAction";
import * as yup from "yup";
import {
  JoinedDateIsNotLaterThanDOB,
  JoinedDateIsNotSaturdayOrSunday,
  TheCharacterIsInvalid,
  UserUnder18,
} from "../../../constants/UserConstants";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PopupInfor from "../../../components/Popup/PopupInfor";

const CreateUser = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.oidc);
  const { roles } = useSelector((state) => state.getAllRoles);
  const [modalOpen, setModalOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  const options = roles.map((role, index) => (
    <option value={role.name} key={index}>
      {role.name}
    </option>
  ));
  const choseAType = (
    <option value={0} key={-1}>
      Choose a type
    </option>
  );
  const roleOptions = [choseAType, ...options];

  const initUser = {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    joinedDate: "",
    gender: "Female",
    type: 0,
    location: "",
  };

  const [newUser, setNewUser] = useState(initUser);
  const disableButton =
    newUser.firstName === initUser.firstName ||
    newUser.lastName === initUser.lastName ||
    initUser.dateOfBirth === newUser.dateOfBirth ||
    initUser.joinedDate === newUser.joinedDate ||
    initUser.type === newUser.type;

  const onSubmit = (e) => {
    setNewUser({ ...newUser, location: user ? user.profile.location : "" });
    const error = () => setErrorOpen(true);
    const success = () => setModalOpen(true);
    dispatch(CreateUserAction(newUser, error, success));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewUser({ ...newUser, [name]: value });
  };

  useEffect(() => {
    dispatch(GetAllRolesAction());
  }, []);

  useEffect(() => {
    setNewUser({ ...newUser, location: user ? user.profile.location : "" });
  }, [user]);

  const theDateOf18YearsAgo = new Date();
  const theYearOf18YearsAgo = theDateOf18YearsAgo.getFullYear() - 18;
  theDateOf18YearsAgo.setFullYear(theYearOf18YearsAgo);

  const theEarliestJoinedDate = newUser.dateOfBirth
    ? new Date(newUser.dateOfBirth)
    : new Date();
  theEarliestJoinedDate.setFullYear(theEarliestJoinedDate.getFullYear() + 18);

  const schema = yup.object().shape({
    firstName: yup.string().matches(/^[A-Za-z]+$/, TheCharacterIsInvalid),
    lastName: yup.string().matches(/^[^\s][A-Za-z\s]+$/, TheCharacterIsInvalid),

    dateOfBirth: yup.date().max(theDateOf18YearsAgo, UserUnder18),

    joinedDate: yup
      .date()
      .min(theEarliestJoinedDate, JoinedDateIsNotLaterThanDOB)
      .test(
        "NotWeekend",
        JoinedDateIsNotSaturdayOrSunday,
        (value) => value.getDay() !== 6 && value.getDay() !== 0
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  return (
    <div className="">
      <h5 className="right-title">Create New User</h5>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group row">
          <label htmlFor="firstName" className="col-sm-2 col-form-label">
            First Name
          </label>
          <div className="col-sm-10 resize">
            <input
              {...register("firstName")}
              type="text"
              className="form-control"
              id="firstName"
              name="firstName"
              value={newUser.firstName}
              onChange={handleInputChange}
              maxlength="100"
            />
            {errors.firstName && (
              <p className="error-message">{errors.firstName.message}</p>
            )}
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="lastName" className="col-sm-2 col-form-label">
            Last Name
          </label>
          <div className="col-sm-10 resize">
            <input
              {...register("lastName")}
              type="text"
              className="form-control"
              id="lastName"
              name="lastName"
              value={newUser.lastName}
              onChange={handleInputChange}
              maxlength="100"
            />
            {errors.lastName && (
              <p className="error-message">{errors.lastName.message}</p>
            )}
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="dateOfBirth" className="col-sm-2 col-form-label">
            Date of Birth
          </label>
          <div className="col-sm-10 resize">
            <div className={errors.dateOfBirth ? "red-boundary" : ""}>
              <input
                {...register("dateOfBirth")}
                type="date"
                className="form-control"
                id="dateOfBirth"
                name="dateOfBirth"
                value={newUser.dateOfBirth}
                onChange={handleInputChange}
                max="9999-12-19"
              />
            </div>
            {errors.dateOfBirth && (
              <p className="error-message">{errors.dateOfBirth.message}</p>
            )}
          </div>
        </div>
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
                    id="female"
                    value="Female"
                    checked={newUser.gender === "Female"}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label" htmlFor="female">
                    Female
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    id="male"
                    value="Male"
                    checked={newUser.gender === "Male"}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label" htmlFor="male">
                    Male
                  </label>
                </div>
              </div>
            </div>
          </div>
        </fieldset>
        <div className="form-group row">
          <label htmlFor="joinedDate" className="col-sm-2 col-form-label">
            Joined Date
          </label>
          <div className="col-sm-10 resize">
            <div className={errors.dateOfBirth ? "red-boundary" : ""}>
              <input
                {...register("joinedDate")}
                type="date"
                className="form-control"
                id="joinedDate"
                name="joinedDate"
                value={newUser.joinedDate}
                onChange={handleInputChange}
                max="9999-12-19"
              />
            </div>
            {errors.joinedDate && (
              <p className="error-message">{errors.joinedDate.message}</p>
            )}
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="type" className="col-sm-2 col-form-label">
            Type
          </label>
          <div className="col-sm-10 resize">
            <select
              {...register("type")}
              id="type"
              name="type"
              className="custom-select custom-select-lg mb-3 form-control"
              defaultValue={0}
              onChange={handleInputChange}
            >
              {roleOptions}
            </select>
          </div>
        </div>
        <div className="d-flex flex-row-reverse">
          <Link to="/manage-user">
            <button
              type="button"
              className="btn btn-outline-danger margin color1"
            >
              Cancel
            </button>
          </Link>
          <button
            type="submit"
            className="btn btn-outline-danger margin color"
            disabled={disableButton}
          >
            Save
          </button>
        </div>
      </form>
      <PopupInfor
        title="Information"
        content="Create user successfully"
        handleModelShow={(content) => setModalOpen(content)}
        isModalOpen={modalOpen}
        pathReturn="/manage-user"
      ></PopupInfor>
      <PopupInfor
        title="Error"
        content="Create user fail"
        handleModelShow={(content) => setErrorOpen(content)}
        isModalOpen={errorOpen}
      ></PopupInfor>
    </div>
  );
};
export default CreateUser;
