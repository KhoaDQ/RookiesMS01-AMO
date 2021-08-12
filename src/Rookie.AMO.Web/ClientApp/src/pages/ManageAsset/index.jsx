import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import apiCaller from '../../apis/callApi'
import *as action from '../../actions/ManagerAsset/ActionType'
import *as actionCategory from '../../actions/ManagerCategory/ActionType'
import AssetList from "../../components/Asset/AssetList";
import AssetItem from "../../components/Asset/AssetItem";
import PopupDetailAsset from "../../components/Popup/PopupDetailAsset";

const stateList = [
  {name: "Assigned",value: "Assigned"},
  {name: "Available", value: "Available"},
  {name: "Not available", value: "NotAvailable"},
  {name: "Waiting for recycling",value:"Waiting"},
  {name: "Recycled",value:"Recycled"}
]

function ManageAsset() {

  const [stateFilter,setStateFilter] = useState("")
  const [categoryFilter,setCategoryFilter] = useState("")
  const [searchText,setSearchText] = useState("")
  const [pageNumber,setPageNumber] = useState(1)
  const [optionSort,setOptionSort] = useState({propertyName: "", desc: 'false'})

  const [isLoading,setIsLoading] = useState(true)

  const [assetDetail,setAssetDetail] = useState()
  const [isModalOpen,setIsModalOpen] = useState(true)

  let assetPage = fetchPageAsset(stateFilter,categoryFilter,searchText,pageNumber,optionSort);

  checkLoading(setIsLoading,assetPage)
  
  var categories = fetchCategories();
  
  let assets = assetPage.items;

  const resetPage = () => {
      setPageNumber(1)
  }

  const handleSort = (e,option) =>{
      setOptionSort({propertyName:option.propertyName, desc: option.desc.toString()})
  }

  const handleSearch = (text,e) =>{
      resetPage()
      setSearchText(text)
  }
  const handleFilterState = (option,e) => {
    if(option!=null)
      setStateFilter(option.map((a,index)=>a.value).join(','))
    else
      setStateFilter("")
  }

  const handleFilterCat = (option,e) => {
    if(option!=null)
      setCategoryFilter(option.map((a,index)=>a.id).join(','))
    else
      setCategoryFilter("")
  }

  const handleDetail = (asset,e) =>{
    setAssetDetail(asset)
    setIsModalOpen(true)
  }
  
  const handleModelShow = (isModalOpen) =>{
    setIsModalOpen(isModalOpen)
  }
  function detailAsset(assetDetail,isModalOpen){
    if(assetDetail)
      return (
        <PopupDetailAsset asset = {assetDetail} isModalOpen={isModalOpen} handleModelShow = {handleModelShow}/>
      )
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
                  handleDetail = {handleDetail}
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
        isLoading = {isLoading}
        categories = {categories} 
        stateList = {stateList}
        totalPages= {assetPage.totalPages}
        totalItems= {assetPage.totalItems}
        pageNumber = {pageNumber}
        setPageNumber = {setPageNumber}
        handleSort = {handleSort}
        handleFilterState = {handleFilterState}
        handleFilterCat = {handleFilterCat}
        handleSearch = {handleSearch}
      >
      {showAssets(assets)}  
      </AssetList>
      {detailAsset(assetDetail,isModalOpen)}
    </div>
    
  );
}

function fetchPageAsset(stateFilter,categoryFilter,searchText,pageNumber,optionSort = {propertyName: "", desc: "false"}) {
  const dispatch = useDispatch()
  
  useEffect(() => {
    async function fetch() {
      let enpoint = 'Asset/find?State='+stateFilter+'&Category='+categoryFilter+'&KeySearch='+ searchText+'&OrderProperty='+optionSort.propertyName+'&Desc='+optionSort.desc+'&Page='+pageNumber+'&Limit=2';
      
      console.log(enpoint)
      const res = await apiCaller(enpoint, 'GET', null);
      dispatch({ type: action.FETCH_ASSETS, payload: res.data });
    }
  fetch()
  }, [stateFilter,categoryFilter,searchText,pageNumber,optionSort.propertyName,optionSort.desc])

  const assetPage = useSelector(state => state.AssetReducer);

  return assetPage
}

function checkLoading(setIsLoading,page){
  useEffect(()=>{
    if('items' in page)
      setIsLoading(false)
  },[page])
}

function fetchCategories () {
  const dispatch = useDispatch()

  useEffect(() => {
    async function fetch() {
      const res = await apiCaller('Category', 'GET', null);
      dispatch({ type: actionCategory.FETCH_CATEGORY, payload: res.data });
    }
    fetch()
  }, [])

  const categories = useSelector(state => state.CategoryReducer);

  return categories
}

export default ManageAsset;
