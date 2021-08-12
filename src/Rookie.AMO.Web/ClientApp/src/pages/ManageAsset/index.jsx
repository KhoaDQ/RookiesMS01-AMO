import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import apiCaller from '../../apis/callApi'
import *as action from '../../actions/ManagerAsset/ActionType'
import *as actionCategory from '../../actions/ManagerCategory/ActionType'
import AssetList from "../../components/Asset/AssetList";
import AssetItem from "../../components/Asset/AssetItem";

const stateList = [
  
  {name: "Assigned",value: "Assigned"},
  {name: "Available", value: "Available"},
  {name: "Not available", value: "NotAvailable"},
  {name: "Waiting for recycling",value:"Waiting"},
  {name: "Recycled",value:"Recycled"}
]

function ManageAsset() {

  const [stateFilter,setStateFilter] = useState([])
  const [categoryFilter,setCategoryFilter] = useState([])
  const [searchText,setSearchText] = useState("")
  const [pageNumber,setPageNumber] = useState(1)

  const [optionSort,setOptionSort] = useState({propertyName: "", desc: false})

  
  let assetPage = fetchPageAsset(searchText,pageNumber,optionSort);

  var categories = fetchCategories();
  
  let assets = assetPage.items;

  const resetPage = () => {
      setPageNumber(1)
  }

  const handleSort = (e) =>{
      setOptionSort({propertyName: e.target.id, desc: false})
  }

  return (
    <div>
      <AssetList 
        categories = {categories} 
        setSearchText = {setSearchText}
        stateList = {stateList}
        totalPages= {assetPage.totalPages}
        totalItems= {assetPage.totalItems}
        pageNumber = {pageNumber}
        setPageNumber = {setPageNumber}
        resetPage = {resetPage}
        handleSort = {handleSort}
      >

      {showAssets(assets)}

      </AssetList>
    </div>
    
  );
}

function fetchPageAsset(searchText,pageNumber,optionSort = {propertyName: "", desc: false}) {
  const dispatch = useDispatch()

  useEffect(() => {
    async function fetch() {
      let enpoint = 'Asset/find?KeySearch='+ searchText+'&OrderProperty='+optionSort.propertyName+'&Desc='+optionSort.desc+'&Page='+pageNumber+'&Limit=19';
      console.log(enpoint)
      const res = await apiCaller(enpoint, 'GET', null);
      dispatch({ type: action.FETCH_ASSETS, payload: res });
    }
  fetch()
  }, [searchText,pageNumber,optionSort.propertyName,optionSort.desc])

  const assetPage = useSelector(state => state.AssetReducer);

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

  const categories = useSelector(state => state.CategoryReducer);

  return categories
}

function filterAssets(assets,propertyName,arrayFilter){
  if(arrayFilter == [] || ! (propertyName in assets))
    return assets
  return assets.filter(asset => arrayFilter.includes(asset[propertyName]))
}

function filterPageAsset(assetPage,stateFilter,categoryFilter){

    let assets = null
    useEffect(() => {
      async function filter() {
        console.log(assetPage)
        if (assetPage!=null && 'items' in assetPage){
          assets = assetPage.items
          //assets = filterAssets(assets,"state",stateFilter)
          //assets = filterAssets(assets,"category",categoryFilter)
        }
      }
      filter();
    }, [assetPage])
    
    return assets

}
function showAssets (assets){
  let result = null
  if(assets != null){
    if(assets.length > 0){
      result = assets.map((asset, index) => {
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


export default ManageAsset;
