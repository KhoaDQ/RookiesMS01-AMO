import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import apiCaller from '../../apis/CallerApi'
import *as action from '../../actions/ManageAsset/ActionType'
import *as actionCategory from '../../actions/ManageCategory/ActionType'
import AssetList from "../../components/Asset/AssetList";
import AssetItem from "../../components/Asset/AssetItem";
function ManageAsset() {

  const [searchText,setSearchText] = useState("")
  const [pageNumber,setPageNumber] = useState(1)

  let assetPage = fetchAssets(searchText,pageNumber);

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
    if (assetPage!=null && 'items' in assetPage) {
      if(assetPage.items.length > 0){
        result = assetPage.items.map((asset, index) => {
          console.log(stateList.filter((e) => e.value == asset.state))
            return (
                <AssetItem
                    key={index}
                    asset={asset}
                    index={index}
                    stateList = {stateList}
                />
            )
        })
      }
    }
    
    return result
  }


  return (
    <div>
      <AssetList 
        categories = {categories} 
        setSearchText = {setSearchText}
        stateList = {stateList}
        totalPages= {assetPage.totalPages}
        totalItems= {assetPage.totalItems}
      >

        {showAssets()}

      </AssetList>
    </div>
    
  );
}
function fetchAssets (searchText,pageNumber) {
  const dispatch = useDispatch()

  useEffect(() => {
    async function fetch() {
      let enpoint = 'Asset/find?key='+ searchText +'&page='+pageNumber+'&limit=19';
      console.log(enpoint)
      const res = await apiCaller(enpoint, 'GET', null);
    dispatch({ type: action.FETCH_ASSETS, payload: res });
  }
  fetch()
  }, [searchText,pageNumber])

  const assetPage = useSelector(state => state.assets);

  return assetPage
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
