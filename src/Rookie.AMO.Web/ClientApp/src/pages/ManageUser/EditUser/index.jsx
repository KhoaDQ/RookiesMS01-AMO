import React from "react";

const EditUser = () => {
  return (
    <div>
      <h5 className="right-title">Edit User</h5>
      <form>
        <div className="form-group row">
          <label htmlFor="EmailEditUser" className="col-sm-2 col-form-label">
            Email
          </label>
          <div className="col-sm-10" className="resize">
            <input type="email" className="form-control" id="EmailEditUser" />
          </div>
        </div>
        <br></br>
        <div className="form-group row">
          <label htmlFor="PasswordEditUser" className="col-sm-2 col-form-label">
            Password
          </label>
          <div className="col-sm-10" className="resize">
            <input
              type="password"
              className="form-control"
              id="PasswordEditUser"
            />
          </div>
        </div>
        <br></br>
        <div className="form-group row">
          <label htmlFor="GenderEditUser" className="col-sm-2 col-form-label">
            Gender
          </label>
          <div className="col-sm-10" className="resize">
            <input
              type="date"
              className="form-control "
              id="GenderEditUser"
              name="GenderEditUser"
            />
          </div>
        </div>
        <br></br>
        <fieldset className="form-group">
          <div className="row">
            <legend className="col-form-label col-sm-2 pt-0">Radios</legend>
            <div className="col-sm-10">
              <div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="FemaleEditUser"
                    id="gridRadios1"
                    defaultValue="option1"
                  />
                  <label className="form-check-label" htmlFor="gridRadios1">
                    Female
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="MaleEditUser"
                    id="gridRadios2"
                    defaultValue="option2"
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
          <label htmlFor="GenderEditUser" className="col-sm-2 col-form-label">
            Gender
          </label>
          <div className="col-sm-10" className="resize">
            <input
              type="date"
              className="form-control "
              id="GenderEditUser"
              name="GenderEditUser"
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
              className="custom-select custom-select-lg mb-3"
              className="form-control"
            >
              <option value={0}></option>
              <option value={1}>Staff</option>
              <option value={2}>Customer</option>
            </select>
          </div>
        </div>
        <br></br>

        <button type="button" class="btn btn-outline-danger margin color">
          Save
        </button>
        <button type="button" class="btn btn-outline-danger color1">
          Cancel
        </button>
      </form>
    </div>
  );
};
export default EditUser;
