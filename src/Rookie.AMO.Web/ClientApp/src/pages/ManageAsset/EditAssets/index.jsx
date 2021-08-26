import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import apiCaller from "../../../apis/callApi";
import * as action from "../../../actions/ManagerAsset/ActionType";
import * as ac from "../../../actions//IndexCom/ActionType";
import { Link, useHistory } from "react-router-dom";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import moment from "moment";
import PopupInfor from "../../../components/Popup/PopupInfor";

const EditAssets = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  dispatch({ type: ac.CHANGE_INDEX, payload: "/edit-assets" });
  const EditAsset = useSelector((state) => state.EditAsset);
  const CategoryReducer = useSelector((state) => state.CategoryReducer);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [state, setState] = useState({
    Name: "",
    CategoryId: "",
    Specification: "",
    InstalledDate: moment().toDate(),
    State: "NotAvailable",
  });

  const stateList = [
    { name: "Assigned", value: "Assigned" },
    { name: "Available", value: "Available" },
    { name: "Not available", value: "NotAvailable" },
    { name: "Waiting for recycling", value: "WaitingRecycle" },
    { name: "Recycled", value: "Recycled" },
  ];

  const initAsset = FetchAsset(props.match.params.id);
  useEffect(() => {
    if (initAsset) {
      setState({
        Name: initAsset.name || "",
        CategoryId: initAsset.categoryId,
        Specification: initAsset.specification,
        InstalledDate: initAsset.installedDate,
        State: initAsset.state,
      });
    }
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

  const handleModelShowFunction = (content) => {
    setIsModalOpen(content);
  };

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
  const handleOnSubmit = (e) => {
    // e.preventDefault();
    async function EditAsset() {
      const res = await apiCaller(
        `Asset/${props.match.params.id}`,
        "PUT",
        state
      );
      if (res.status === 200) {
        dispatch({ type: action.UPDATE_ASSETS, payload: res.data });
      }
      setIsModalOpen(true);
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

  const disabledButton = (state) => {
    if (!state.Name || !state.CategoryId || !state.Specification) return true;
    if (
      state.Name === "" ||
      state.CategoryId === "" ||
      state.Specification == ""
    )
      return true;
    return false;
  };

  const schema = yup.object().shape({
    Name: yup
      .string()
      .max(100, "Maximum 100 characters")
      .required()
      .matches(
        /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
        "Allow only characters A-Z,a-z, 0-9, Space"
      ),

    Specification: yup.string().max(100, "Maximum 100 characters"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <div className="row">
      <div className="col-8">
        <h5 className="right-title mb-5">Edit Asset</h5>
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <div className="form-group row">
            <label htmlFor="nameAssets" className="col-3 col-form-label">
              Name
            </label>
            <div className="col-9 resize">
              <input
                {...register("Name")}
                type="text"
                className="form-control"
                id="Name"
                name="Name"
                value={state.Name}
                onChange={handleInputChange}
              />
              {errors.Name && (
                <p className="text-danger">{errors.Name.message}</p>
              )}
            </div>
          </div>
          <br></br>
          <div className="form-group row">
            <label htmlFor="categoryAssets" className="col-sm-3 col-form-label">
              Category
            </label>
            <div className="col-sm-9 resize">
              <select
                className="form-control custom-select custom-select-lg mb-3"
                // className="form-control"
                value={state.CategoryId}
                name="categoryId"
                onChange={handleChange}
                //disabled
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
              className="col-sm-3 col-form-label"
            >
              Specification
            </label>
            <div className="col-sm-9 resize">
              <textarea
                {...register("Specification")}
                type="text"
                className="form-control height"
                id="specification"
                name="Specification"
                value={state.Specification}
                onChange={handleInputChange}
              />
              {errors.Specification && (
                <p className="text-danger">{errors.Specification.message}</p>
              )}
            </div>
          </div>
          <br></br>
          <div className="form-group row">
            <label htmlFor="installedDate" className="col-sm-3 col-form-label">
              Installed Date
            </label>
            <div className="col-sm-9 resize">
              <input
                type="date"
                className="form-control "
                id="InstalledDate"
                name="installedDate"
                onChange={(e) => {
                  const value = e.target?.value;

                  setState({
                    ...state,
                    InstalledDate: value,
                  });
                }}
                value={moment(state.InstalledDate).format("YYYY-MM-DD")}
              />
            </div>
          </div>
          <br></br>
          <fieldset className="form-group" id="State">
            <div className="row">
              <legend className="col-form-label col-sm-3 pt-0">State</legend>
              <div className="col-sm-9">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="State"
                    id="gridRadios1"
                    value="Available"
                    checked={state.State === "Available"}
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
                    value="NotAvailable"
                    checked={state.State === "NotAvailable"}
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
                    name="State"
                    id="gridRadios3"
                    value="WaitingRecycle"
                    checked={state.State === "WaitingRecycle"}
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
                    name="State"
                    id="gridRadios4"
                    value="Recycled"
                    checked={state.State === "Recycled"}
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
          <div className="d-flex flex-row-reverse">
          <button
            type="button"
            className="btn btn-outline-danger margin color1"
          >
            <Link to="/manage-asset">Cancel</Link>
          </button>
          <button
            type="submit"
            class="btn btn-outline-danger margin color"
            disabled={disabledButton(state)}
          >
            Save
          </button>
          </div>
        </form>
        <PopupInfor
          title="Information"
          content="Edit asset successfully"
          handleModelShow={handleModelShowFunction}
          isModalOpen={isModalOpen}
          pathReturn="/manage-asset"
        ></PopupInfor>
      </div>
      <div className="col-4"></div>
    </div>
  );
};

function FetchAsset(id) {
  const dispatch = useDispatch();
  //htttps://localhost:5011/api/users/{id}
  //15a9f5fd-00b9-4a55-b463-0fb7acdc6f88
  useEffect(() => {
    async function fetch() {
      let enpoint = `Asset/${id}`;
      const res = await apiCaller(enpoint, "GET", null);
      dispatch({ type: action.GET_ASSET_BY_ID, payload: res.data });
    }
    fetch();
  }, []);

  const result = useSelector((state) => state.AssetReducer.assetById);
  return result;
}

export default EditAssets;
