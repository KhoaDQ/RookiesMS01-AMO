import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { ConfirmNewPasswordNotBeTheSame, TheCharacterIsInvalidNotAllowSpaceCharacter } from "../../constants/UserConstants";
import { useSelector } from "react-redux";
import { Fragment } from "react";
import PopupInfor from "./PopupInfor";

export default function PopupChangePassword(props) {
  const { user } = useSelector((state) => state.oidc);
  const [isModalOpen, setIsModalOpen] = useState(props.isModalOpen);
  const [isInforShow, setIsInforShow] = useState(false);
  const [lock, setLock] = useState(false);
  const [model, setModel] = useState({
    id: "",
    changePasswordTimes: -1,
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  useEffect(() => {
    if (user != null) {
      setModel({
        ...model,
        id: user.profile.sub,
        changePasswordTimes: user.profile.changePasswordTimes,
      });
      if (user.profile.changePasswordTimes == 0) {
        setLock(true);
      }
    }
  }, [user]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setModel({ ...model, [name]: value });
  };

  const onSubmit = () => {
    console.log(model);
    setIsModalOpen(false);
    setIsInforShow(true);
  };

  const disableSaveButton = !((lock || model.currentPassword !== "")
                      && model.newPassword !== ""
                      && model.confirmNewPassword !== "");

  const schema = yup.object().shape({
    currentPassword: !lock ? yup
      .string()
      .matches(/^[A-Za-z^\s]+$/, TheCharacterIsInvalidNotAllowSpaceCharacter) : yup.string(),
    newPassword: yup
      .string()
      .matches(/^[A-Za-z^\s]+$/, TheCharacterIsInvalidNotAllowSpaceCharacter),

    confirmNewPassword: yup
      .string()
      .matches(/^[A-Za-z^\s]+$/, TheCharacterIsInvalidNotAllowSpaceCharacter)
      .oneOf([yup.ref('newPassword'), null], ConfirmNewPasswordNotBeTheSame)
      ,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    reValidateMode: "onChange"
  });

  return (
    <Fragment>
      <div className="popup">
      <div
        className={"modal " + (isModalOpen ? "modal__open" : "modal__close")}
      >
        <div className="modal__overlay"></div>

        <div className="modal__body">
          <div className="auth-form width-cp">
            <div className="auth-form__header">
              <div className="row">
                <div className="col-md-8">
                  <p className="auth-form__question">Change password</p>
                </div>
              </div>
            </div>
            <div className="auth-form__body">
              <div className="auth-form__heading">
                <form onSubmit={handleSubmit(onSubmit)}>
                  {lock && <div className="form-group row">
                  <p
                      htmlFor="lastName"
                      className="col-sm-12 col-form-label"
                    >
                      This is the first time you logged in.<br />
                      You have to change your password to continue.
                    </p>
                    </div>}
                  {!lock && <div className="form-group row">
                    <label
                      htmlFor="lastName"
                      className="col-sm-5 col-form-label"
                    >
                      Old Password
                    </label>
                    <div className="col-sm-7 resize">
                      <input
                        {...register("currentPassword")}
                        type="password"
                        className="form-control"
                        id="currentPassword"
                        name="currentPassword"
                        value={model.currentPassword}
                        onChange={handleInputChange}
                        maxLength="8"
                      />
                      {errors.currentPassword && (
                        <p className="error-message">{errors.currentPassword.message}</p>
                      )}
                    </div>
                  </div>}
                  <div className="form-group row">
                    <label
                      htmlFor="newPassword"
                      className="col-sm-5 col-form-label"
                    >
                      New Password
                    </label>
                    <div className="col-sm-7 resize">
                      <input
                        {...register("newPassword")}
                        type="password"
                        className="form-control"
                        id="newPassword"
                        name="newPassword"
                        value={model.newPassword}
                        onChange={handleInputChange}
                        maxLength="8"
                      />
                      {errors.newPassword && (
                        <p className="error-message">{errors.newPassword.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="confirmNewPassword"
                      className="col-sm-5 col-form-label"
                    >
                      Confirm New Password
                    </label>
                    <div className="col-sm-7 resize">
                      <input
                        {...register("confirmNewPassword")}
                        type="password"
                        className="form-control"
                        id="confirmNewPassword"
                        name="confirmNewPassword"
                        value={model.confirmNewPassword}
                        onChange={handleInputChange}
                        maxLength="8"
                      />
                      {errors.confirmNewPassword && (
                        <p className="error-message">{errors.confirmNewPassword.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="form-group rows">
                    <div className="col-sm-5"></div>
                    <div className="col-sm-7 resize">
                      <button
                        type="submit"
                        className="btn btn-outline-danger margin color"
                        disabled={disableSaveButton}
                      >
                        Save
                      </button>
                      {!lock && <button
                        type="button"
                        className="btn btn-outline-danger color1"
                        onClick={() => setIsModalOpen(false)}
                      >
                        Cancel
                      </button>}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <PopupInfor
      title="Information"
      content="Your password has been changed successfully"
      handleModelShow={(content) => setIsInforShow(content)}
      isModalOpen={isInforShow}
    >
    </PopupInfor>
    </Fragment>
      );
}
