import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import apiCaller from '../../apis/CallerApi'
import *as action from '../../actions/ManageAsset/ActionType'
import *as actionCategory from '../../actions/ManageCategory/ActionType'
import AssetList from "../../components/Asset/AssetList";
import AssetItem from "../../components/Asset/AssetItem";
import Pagination from "../../components/common/Pagination";

function ManageAsset() {

  const [searchText,setSearchText] = useState("")

  let assets = fetchAssets(searchText);

  var categories = fetchCategories();
  
  const stateList = [
    {name: "Assigned",value: "Assigned"},
    {name: "Available", value: "Available"},
    {name: "Not available", value: "NotAvailable"},
    {name: "Waiting for recycling",value:"Waiting"},
    {name: "Recycled",value:"Recycled"}
  ]
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
    <div>
      <AssetList 
      categories = {categories} 
      setSearchText = {setSearchText}
      stateList = {stateList}>

        {showAssets()}

      </AssetList>
    </div>
    
  );
}
function fetchAssets (searchText) {
  const dispatch = useDispatch()

  useEffect(() => {
    async function fetch() {
      let enpoint = 'Asset/find?key='+ searchText +'&page=1&limit=1';
      console.log(enpoint)
      const res = await apiCaller(enpoint, 'GET', null);
    dispatch({ type: action.FETCH_ASSETS, payload: res });
  }
  fetch()
  }, [searchText])

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
