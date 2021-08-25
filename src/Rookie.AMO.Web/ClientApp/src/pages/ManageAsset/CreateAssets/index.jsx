import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import apiCaller from '../../../apis/callApi';
import * as action from '../../../actions/ManagerAsset/ActionType';
import * as ac from '../../../actions//IndexCom/ActionType';
import PopupInfor from '../../../components/Popup/PopupInfor';

const CreateAssets = () => {
  const dispatch = useDispatch();
  dispatch({ type: ac.CHANGE_INDEX, payload: '/createassets' });
  const AssetReducer = useSelector((state) => state.AssetReducer);
  const CategoryReducer = useSelector((state) => state.CategoryReducer);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const initAsset = {
    Name: '',
    CategoryId: 0,
    Specification: '',
    InstalledDate: '',
    State: '',
  };
  const [newAsset, setNewAsset] = useState(initAsset);

  const disableButton =
    newAsset.Name === initAsset.Name ||
    newAsset.Specification === initAsset.Specification ||
    initAsset.InstalledDate === newAsset.InstalledDate ||
    initAsset.CategoryId === newAsset.CategoryId ||
    initAsset.State === newAsset.State;

  const schema = yup.object().shape({
    Name: yup
      .string()
      .required()
      .max(100, 'Maximum 100 characters')
      .matches(
        /^([A-Z0-9._%+-]+[A-Z0-9._%+-\s]*)$/gi,
        'Allow only characters A-Z,a-z, 0-9, Space'
      ),

    Specification: yup.string().max(100, 'Maximum 100 characters'),
  });

  useEffect(() => {
    async function fetchCategory() {
      const res = await apiCaller('Category', 'GET', null);
      dispatch({
        type: 'FETCH_CATEGORY',
        payload: res.data,
      });
    }
    fetchCategory();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAsset({ ...newAsset, [name]: value });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAsset({ ...newAsset, [name]: value });
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setNewAsset({ ...newAsset, [name]: value });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleModelShowFunction = (content) => {
    setIsModalOpen(content);
  };

  const handleOnSubmit = (e) => {
    // e.preventDefault();

    async function CreateAsset() {
      const res = await apiCaller('Asset', 'POST', newAsset);
      dispatch({ type: action.CREATE_ASSET, payload: res.data });
    }

    try {
      CreateAsset();
      setIsModalOpen(true);
    } catch (error) {
      console.log(error);
    }
  };
  const listCategory = CategoryReducer.map((category, index) => {
    return <option value={category.id}>{category.name}</option>;
  });
  return (
    <div>
      <h5 className="right-title">Create New Assets</h5>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <div className="form-group row">
          <label htmlFor="nameAssets" className="col-sm-2 col-form-label">
            Name
          </label>
          <div className="col-sm-10" className="resize">
            <input
              {...register('Name')}
              type="text"
              className="form-control"
              id="Name"
              name="Name"
              value={newAsset.Name}
              onChange={handleInputChange}
            />
            {errors.Name && <p>{errors.Name.message}</p>}
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
              value={newAsset.CategoryId}
              name="CategoryId"
              onChange={handleChange}
            >
              <option value={0} defaultChecked>
                Select Category
              </option>
              {listCategory}
              <option> </option>
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
              {...register('Specification')}
              type="text"
              className="form-control height"
              id="Specification"
              name="Specification"
              value={newAsset.Specification}
              onChange={handleInputChange}
            />
            {errors.Specification && <p>{errors.Specification.message}</p>}
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
              value={newAsset.InstalledDate}
              max="9999-12-19"
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
                  defaultChecked={newAsset.State === 'Available'}
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
                  defaultValue="option2"
                  defaultChecked={newAsset.State === 'NotAvailable'}
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
        <button
          type="submit"
          className="btn btn-outline-danger margin color"
          disabled={disableButton}
        >
          Save
        </button>
        <button type="button" class="btn btn-outline-danger color1">
          <Link to="/manage-asset">Cancel</Link>
        </button>
      </form>
      <PopupInfor
        title="Information"
        content="Create Asset successfully"
        handleModelShow={(content) => setIsModalOpen(content)}
        isModalOpen={isModalOpen}
        pathReturn="/manage-asset"
      ></PopupInfor>
      <PopupInfor
        title="Error"
        content="Create asset fail"
        handleModelShow={(content) => setErrorOpen(content)}
        isModalOpen={errorOpen}
      ></PopupInfor>
    </div>
  );
};
export default CreateAssets;
