import React from "react";

const EditUser = () => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  return (
    <div>
      <h5 className="right-title">Edit User</h5>
      <form>
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
              id="FirstNameEditUser"
              defaultValue="user.FirstName"
              placeholder="FirstName"
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
              id="LastNameEditUser"
              defaultValue="user.LastName"
              placeholder="LastName"
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
              id="DateofBirthEditUser"
              name="DateofBirthEditUser"
              defaultValue="user.DateofBirth"
              placeholder="DateofBirth"
            />
          </div>
        </div>
        <br></br>
        <fieldset className="form-group">
          <div className="row">
            <legend className="col-form-label col-sm-2 pt-0">Gender</legend>
            <div className="col-sm-10">
              <div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="GenderEditUser"
                    id="gridRadios1"
                    value="female"
                    onChange={this.handleChange}
                  />
                  <label className="form-check-label" htmlFor="gridRadios1">
                    Female
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="GenderEditUser"
                    id="gridRadios2"
                    value="male"
                    onChange={this.handleChange}
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
              id="JoinedDateEditUser"
              name="JoinedDateEditUser"
              defaultValue="user.JoinedDate"
              placeholder="JoinedDate"
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
