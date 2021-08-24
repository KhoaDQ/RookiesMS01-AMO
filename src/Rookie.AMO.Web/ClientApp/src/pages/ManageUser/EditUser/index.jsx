import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import moment from 'moment';
import {
  JoinedDateIsNotLaterThanDOB,
  JoinedDateIsNotSaturdayOrSunday,
  UserUnder18,
} from '../../../constants/UserConstants';
import { useDispatch, useSelector } from 'react-redux';
import apiCaller from '../../../apis/callApi';
import * as action from '../../../actions/ManageUser/ActionType';
import { GetAllRolesAction } from '../../../actions/ManageUser/GetAllRolesAction';
import PopupInfor from '../../../components/Popup/PopupInfor';
import '../../../assets/css/Base.css';

const EditUser = (props) => {
  const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { roles } = useSelector((state) => state.getAllRoles);
  const result = FetchUser(props.match.params.id);
  useEffect(() => {
    dispatch(GetAllRolesAction());
    setCurrentUser(result);
  }, [result]);

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
    setIsModalOpen(true);
  };

  const handleModelShowFunction = (content) => {
    setIsModalOpen(content);
  };

  const theDateOf18YearsAgo = new Date();
  const theYearOf18YearsAgo = theDateOf18YearsAgo.getFullYear() - 18;
  theDateOf18YearsAgo.setFullYear(theYearOf18YearsAgo);

  const theEarliestJoinedDate = currentUser.dateOfBirth
    ? new Date(currentUser.dateOfBirth)
    : new Date();
  theEarliestJoinedDate.setFullYear(theEarliestJoinedDate.getFullYear() + 18);
  theEarliestJoinedDate.setDate(theEarliestJoinedDate.getDate() + 1);
  console.log(theEarliestJoinedDate);
  const schema = yup.object().shape({
    dateOfBirth: yup.date().max(theDateOf18YearsAgo, UserUnder18),
    joinedDate: yup
      .date()
      .min(theEarliestJoinedDate, JoinedDateIsNotLaterThanDOB)
      .test(
        'NotWeekend',
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
    mode: 'onChange',
  });

  return (
    <div className="row">
      <div className="col-8">
        <h5 className="right-title mb-5">Edit User</h5>
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="form-group row">
            <label htmlFor="FirstNameEditUser" className="col-3 col-form-label">
              First Name
            </label>
            <div className="col-9 resize">
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                value={currentUser.firstName}
                placeholder="FirstName"
                onChange={handleInputChange}
                disabled
              />
            </div>
          </div>
          <br></br>
          <div className="form-group row">
            <label
              htmlFor="LastNameEditUser"
              className="col-sm-3 col-form-label"
            >
              Last Name
            </label>
            <div className="col-sm-9 resize">
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                value={currentUser.lastName}
                placeholder="LastName"
                onChange={handleInputChange}
                disabled
              />
            </div>
          </div>
          <br></br>
          <div className="form-group row">
            <label
              htmlFor="DateofBirthEditUser"
              className="col-sm-3 col-form-label"
            >
              Date of Birth
            </label>
            <div className="col-sm-9 resize">
              <input
                type="date"
                {...register('dateOfBirth', {
                  value: moment(currentUser.dateOfBirth).format('YYYY-MM-DD'),
                })}
                className="form-control "
                id="dateOfBirth"
                name="dateOfBirth"
                defaultValue={moment(currentUser.dateOfBirth).format(
                  'YYYY-MM-DD'
                )}
                value={moment(currentUser.dateOfBirth).format('YYYY-MM-DD')}
                placeholder="DateofBirth"
                onChange={handleInputChange}
              />
              {errors.dateOfBirth && (
                <p className="error-message">{errors.dateOfBirth.message}</p>
              )}
            </div>
          </div>
          <br></br>
          <fieldset className="form-group" id="gender">
            <div className="row">
              <legend className="col-form-label col-sm-3 pt-0">Gender</legend>
              <div className="col-sm-9">
                <div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      id="gridRadios1"
                      value="Female"
                      checked={currentUser.gender === 'Female'}
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
                      checked={currentUser.gender === 'Male'}
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
              className="col-sm-3 col-form-label"
            >
              Joined Date
            </label>
            <div className="col-sm-9 resize">
              <input
                {...register('joinedDate', {
                  value: moment(currentUser.joinedDate).format('YYYY-MM-DD'),
                })}
                type="date"
                className="form-control "
                id="joinedDate"
                name="joinedDate"
                value={moment(currentUser.joinedDate).format('YYYY-MM-DD')}
                placeholder="JoinedDate"
                onChange={handleInputChange}
              />
              {errors.joinedDate && (
                <p className="error-message">{errors.joinedDate.message}</p>
              )}
            </div>
          </div>
          <br></br>
          <div className="form-group row">
            <label htmlFor="TypeEditUser" className="col-sm-3 col-form-label">
              Type
            </label>
            <div className="col-sm-9 resize">
              <div class="selectParent">
                <select
                  name="type"
                  className="custom-select custom-select-lg mb-3"
                  className="form-control"
                  value={currentUser.type}
                  onChange={handleInputChange}
                >
                  {roleOptions}
                </select>
              </div>
            </div>
          </div>
          <br></br>
          <div className="d-flex flex-row-reverse">
            <button
              type="button"
              className="btn btn-outline-danger margin color1"
            >
              <Link to="/manage-user">Cancel</Link>
            </button>
            <button
              type="submit"
              disabled={
                !(
                  currentUser.firstName &&
                  currentUser.lastName &&
                  currentUser.gender &&
                  currentUser.type &&
                  currentUser.dateOfBirth &&
                  currentUser.joinedDate &&
                  currentUser.type != '0'
                )
              }
              className="btn btn-outline-danger margin color"
            >
              Save
            </button>
          </div>
        </form>
        <PopupInfor
          title="Information"
          content="Edit user successfully"
          handleModelShow={handleModelShowFunction}
          isModalOpen={isModalOpen}
          pathReturn="/manage-user"
        ></PopupInfor>
      </div>
      <div className="col-4"></div>
    </div>
  );
};

function FetchUser(id) {
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetch() {
      let enpoint = `user/${id}`;
      console.log(enpoint);
      const res = await apiCaller(enpoint, 'GET', null);
      dispatch({ type: action.GETBYID_USER, payload: res.data });
    }
    fetch();
  }, []);
  const result = useSelector((state) => state.EditUserReducer);
  return result;
}

function FetchCurrentUser(id, user) {
  async function fetch() {
    let enpoint = `user/${id}`;
    const res = await apiCaller(enpoint, 'PUT', user);
    return res;
  }
  return fetch();
}

export default EditUser;
