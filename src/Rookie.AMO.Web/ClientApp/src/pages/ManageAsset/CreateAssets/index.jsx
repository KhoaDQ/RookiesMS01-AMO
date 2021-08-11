import React, { useState } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import apiCaller from "../../../apis/apiCaller";
import * as action from "../../../actions/ManagerAsset/ActionType";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

import {
  Button,
  Row,
  Form,
  Col,
  FormGroup,
  Label,
  Input,
  FormText,
} from "reactstrap";
const CreateAssets = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const AssetReducer = useSelector((state) => state.AssetReducer);
  const CategoryReducer = useSelector((state) => state.CategoryReducer);

  const [state, setState] = useState({
    Name: "",
    CategoryId: "",
    Specification: "",
    InstalledDate: "",
    State: "",
  });

  useEffect(() => {
    async function fetchCategory() {
      const res = await apiCaller("Category", "GET", null);
      console.log(res);
      dispatch({
        type: "FETCH_CATEGORY",
        payload: res.data,
      });
    }
    fetchCategory();
  }, []);
  console.log(CategoryReducer);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setState({ ...state, [name]: value });
    console.log(value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setState({ ...state, [name]: value });
    console.log(value);
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;

    setState({ ...state, [name]: value });
    console.log(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);
    try {
      const res = apiCaller("Asset", "POST", state);
      dispatch({ type: action.CREATE_ASSET, payload: res });
      history.push("/manage-asset");
    } catch (error) {
      console.log(error);
    }
  };
  const listCategory = CategoryReducer.map((category, index) => {
    return <option value={category.id}>{category.name}</option>;
  });
  console.log(listCategory);
  return (
    <div>
      <h5 className="right-title">Create New Assets</h5>
      <form onSubmit={handleSubmit}>
        <div className="form-group row">
          <label htmlFor="nameAssets" className="col-sm-2 col-form-label">
            Name
          </label>
          <div className="col-sm-10" className="resize">
            <input
              type="text"
              className="form-control"
              id="Name"
              name="Name"
              value={state.Name}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <br></br>
        <div className="form-group row">
          <label htmlFor="categoryAssets" className="col-sm-2 col-form-label">
            Category
          </label>
          <div className="col-sm-10" className="resize">
            <select
              className="custom-select custom-select-lg mb-3"
              className="form-control"
              value={state.CategoryId}
              name="CategoryId"
              onChange={handleChange}
            >
              <option value={0} defaultChecked>
                Select Category
              </option>
              {listCategory}
            </select>
          </div>
        </div>
        <br></br>
        <div className="form-group row">
          <label
            htmlFor="specificationCategory"
            className="col-sm-2 col-form-label"
          >
            Specification
          </label>
          <div className="col-sm-10" className="resize">
            <input
              type="text"
              className="form-control height"
              id="Specification"
              name="Specification"
              value={state.Specification}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <br></br>
        <div className="form-group row">
          <label htmlFor="installedDate" className="col-sm-2 col-form-label">
            Installed Date
          </label>
          <div className="col-sm-10" className="resize">
            <input
              type="date"
              className="form-control "
              id="InstalledDate"
              name="InstalledDate"
              value={state.InstalledDate}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <br></br>
        <fieldset className="form-group">
          <div className="row">
            <legend className="col-form-label col-sm-2 pt-0">State</legend>
            <div className="col-sm-10">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="State"
                  id="gridRadios1"
                  value="Available"
                  defaultValue="option1"
                  defaultChecked={state.State === "Available"}
                  onChange={(e) => {
                    handleRadioChange(e);
                  }}
                />
                <label className="form-check-label" htmlFor="gridRadios1">
                  Available
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="State"
                  id="gridRadios2"
                  value="Not Available"
                  defaultValue="option2"
                  defaultChecked={state.State === "Not Available"}
                  onChange={(e) => {
                    handleRadioChange(e);
                  }}
                />
                <label className="form-check-label" htmlFor="gridRadios2">
                  Not Available
                </label>
              </div>
            </div>
          </div>
        </fieldset>

        <br></br>
        <button type="submit" class="btn btn-outline-danger margin color">
          Save
        </button>
        <button type="button" class="btn btn-outline-danger color1">
          Cancel
        </button>
      </form>
    </div>
  );
};
export default CreateAssets;
