import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import apiCaller from '../../apis/CallerApi'
import *as action from '../../actions/ManageAsset/ActionType'
import *as actionCategory from '../../actions/ManageCategory/ActionType'
import AssetList from "../../components/Asset/AssetList";
import AssetItem from "../../components/Asset/AssetItem";

function ManageAsset() {

  var assets = fetchAssets();
  var categories = fetchCategories();

  const showAssets = () => {
    let result = null
    if (assets.length > 0) {
        result = assets.map((asset, index) => {
            return (
                <AssetItem
                    key={index}
                    asset={asset}
                    index={index}
                />
            )
        })
    }
    return result
  }
  return (
    <AssetList categories = {categories}>{showAssets()}</AssetList>
  );
}
function fetchAssets () {
  const dispatch = useDispatch()

  useEffect(() => {
    async function fetch() {
    const res = await apiCaller('Asset', 'GET', null);
    dispatch({ type: action.FETCH_ASSETS, payload: res });
  }
  fetch()
  }, [])

  const assets = useSelector(state => state.assets);

  return assets
}
function fetchCategories () {
  const dispatch = useDispatch()

  useEffect(() => {
    async function fetch() {
    const res = await apiCaller('Category', 'GET', null);
    dispatch({ type: actionCategory.FETCH_CATEGORIES, payload: res });
  }
  fetch()
  }, [])

  const categories = useSelector(state => state.categories);

  return categories
}
export default ManageAsset;
