import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import apiCaller from "../../../apis/callApi";
import * as action from "../../../actions/ManagerAsset/ActionType";
import { useHistory } from "react-router-dom";

const EditAssets = (props) => {
  const history = useHistory();
  console.log(props.match.params.id);
  const dispatch = useDispatch();
  const EditAsset = useSelector((state) => state.EditAsset);
  const CategoryReducer = useSelector((state) => state.CategoryReducer);
  const [state, setState] = useState({
    // Name: "",
    // CategoryId: "",
    // Specification: "",
    // InstalledDate: "",
    // State: "",
  });

  const initAsset = fetchAsset(props.match.params.id);
  useEffect(() => {
    setState(initAsset);
  }, [initAsset]);

  useEffect(() => {
    async function fetchCategory() {
      const res = await apiCaller("Category", "GET", null);

      dispatch({
        type: "FETCH_CATEGORY",

        payload: res.data,
      });
    }
    fetchCategory();
  }, []);
  console.log(CategoryReducer);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);
    async function EditAsset() {
      const res = await apiCaller(
        `Asset/${props.match.params.id}`,
        "PUT",
        state
      );
      console.log(res);
      dispatch({ type: action.UPDATE_ASSETS, payload: res.data });

      history.push("/manage-asset");
    }

    try {
      EditAsset();
    } catch (Err) {
      console.log(Err);
    }
  };

  const listCategory = CategoryReducer.map((category, index) => {
    return <option value={category.id}>{category.name}</option>;
  });

  return (
    <div>
      <h5 className="right-title">Edit Assets</h5>
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
              name="name"
              value={state.name}
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
              value={state.categoryId}
              name="categoryId"
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
              name="specification"
              value={state.specification}
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
              name="installedDate"
              value={state.installedDate}
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
                  name="state"
                  id="gridRadios1"
                  value="Available"
                  defaultValue="option1"
                  defaultChecked={state.state === "Available"}
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
                  name="state"
                  id="gridRadios2"
                  value="NotAvailable"
                  defaultValue="option2"
                  defaultChecked={state.state === "NotAvailable"}
                  onChange={(e) => {
                    handleRadioChange(e);
                  }}
                />
                <label className="form-check-label" htmlFor="gridRadios2">
                  Not Available
                </label>
              </div>
              <div className="form-check ">
                <input
                  className="form-check-input"
                  type="radio"
                  name="state"
                  id="gridRadios3"
                  value="Waiting"
                  defaultValue="option3"
                  defaultChecked={state.state === "Waiting"}
                  onChange={(e) => {
                    handleRadioChange(e);
                  }}
                />
                <label className="form-check-label" htmlFor="gridRadios3">
                  Waiting for recycling
                </label>
              </div>
              <div className="form-check ">
                <input
                  className="form-check-input"
                  type="radio"
                  name="state"
                  id="gridRadios4"
                  value="Recycled"
                  defaultValue="option4"
                  defaultChecked={state.state === "Recycled"}
                  onChange={(e) => {
                    handleRadioChange(e);
                  }}
                />
                <label className="form-check-label" htmlFor="gridRadios4">
                  Recycled
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

function fetchAsset(id) {
  const dispatch = useDispatch();
  //htttps://localhost:5011/api/users/{id}
  //15a9f5fd-00b9-4a55-b463-0fb7acdc6f88
  useEffect(() => {
    async function fetch() {
      let enpoint = `Asset/${id}`;
      console.log(enpoint);
      const res = await apiCaller(enpoint, "GET", null);
      dispatch({ type: action.GET_ASSET_BY_ID, payload: res.data });
    }
    fetch();
  }, []);

  const result = useSelector((state) => state.EditAsset);
  return result;
}

export default EditAssets;
