import React from "react";

const EditAssets = () => {
  return (
    <div>
      {" "}
      <h5 className="right-title">Create New Assets</h5>{" "}
      <form>
        {" "}
        <div className="form-group row">
          {" "}
          <label htmlFor="nameAssets" className="col-sm-2 col-form-label">
            {" "}
            Name{" "}
          </label>{" "}
          <div className="col-sm-10" className="resize">
            {" "}
            <input type="text" className="form-control" id="nameAssets" />{" "}
          </div>{" "}
        </div>{" "}
        <br></br>{" "}
        <div className="form-group row">
          {" "}
          <label htmlFor="categoryAssets" className="col-sm-2 col-form-label">
            {" "}
            Category{" "}
          </label>{" "}
          <div className="col-sm-10" className="resize">
            {" "}
            <select
              className="custom-select custom-select-lg mb-3"
              className="form-control"
            >
              {" "}
              <option value={0}></option> <option value={1}>Laptop</option>{" "}
              <option value={2}>Monitor</option>{" "}
            </select>{" "}
          </div>{" "}
        </div>{" "}
        <br></br>{" "}
        <div className="form-group row">
          {" "}
          <label
            htmlFor="specificationCategory"
            className="col-sm-2 col-form-label"
          >
            {" "}
            Specification{" "}
          </label>{" "}
          <div className="col-sm-10" className="resize">
            {" "}
            <input
              type="text"
              className="form-control height"
              id="specificationCategory"
            />{" "}
          </div>{" "}
        </div>{" "}
        <br></br>{" "}
        <div className="form-group row">
          {" "}
          <label htmlFor="installedDate" className="col-sm-2 col-form-label">
            {" "}
            Installed Date{" "}
          </label>{" "}
          <div className="col-sm-10" className="resize">
            {" "}
            <input
              type="date"
              className="form-control "
              id="installedDate"
              name="installedDate"
            />{" "}
          </div>{" "}
        </div>{" "}
        <br></br>{" "}
        <fieldset className="form-group">
          {" "}
          <div className="row">
            {" "}
            <legend className="col-form-label col-sm-2 pt-0">State</legend>{" "}
            <div className="col-sm-10">
              {" "}
              <div className="form-check">
                {" "}
                <input
                  className="form-check-input"
                  type="radio"
                  name="Available"
                  id="gridRadios1"
                  defaultValue="option1"
                  defaultChecked
                />{" "}
                <label className="form-check-label" htmlFor="gridRadios1">
                  {" "}
                  Available{" "}
                </label>{" "}
              </div>{" "}
              <div className="form-check">
                {" "}
                <input
                  className="form-check-input"
                  type="radio"
                  name="NotAvailable"
                  id="gridRadios2"
                  defaultValue="option2"
                />{" "}
                <label className="form-check-label" htmlFor="gridRadios2">
                  {" "}
                  Not Available{" "}
                </label>{" "}
              </div>{" "}
              <div className="form-check ">
                {" "}
                <input
                  className="form-check-input"
                  type="radio"
                  name="Waitingforrecycling"
                  id="gridRadios3"
                  defaultValue="option3"
                />{" "}
                <label className="form-check-label" htmlFor="gridRadios3">
                  {" "}
                  Waiting for recycling{" "}
                </label>{" "}
              </div>{" "}
              <div className="form-check ">
                {" "}
                <input
                  className="form-check-input"
                  type="radio"
                  name=" Recycle"
                  id="gridRadios4"
                  defaultValue="option4"
                />{" "}
                <label className="form-check-label" htmlFor="gridRadios4">
                  {" "}
                  Recycle{" "}
                </label>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </fieldset>{" "}
        <br></br>{" "}
        <button type="button" class="btn btn-outline-danger margin color">
          {" "}
          Save{" "}
        </button>{" "}
        <button type="button" class="btn btn-outline-danger color1">
          {" "}
          Cancel{" "}
        </button>{" "}
      </form>{" "}
    </div>
  );
};

export default EditAssets;
