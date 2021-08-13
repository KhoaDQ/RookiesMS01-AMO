import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import apiCaller from "../../apis/callApi";
import * as action from "../../actions/ManagerAsset/ActionType";
import * as actionCategory from "../../actions/ManagerCategory/ActionType";
import AssetList from "../../components/Asset/AssetList";
import AssetItem from "../../components/Asset/AssetItem";
import PopupDetailAsset from "../../components/Popup/PopupDetailAsset";
import PopupDelete from "../../components/Popup/PopupDelete";
import { set } from "react-hook-form";
const stateList = [
  { name: "Assigned", value: "Assigned" },
  { name: "Available", value: "Available" },
  { name: "Not available", value: "NotAvailable" },
  { name: "Waiting for recycling", value: "Waiting" },
  { name: "Recycled", value: "Recycled" },
];

function ManageAsset() {
  //Table assets
  const [stateFilter,setStateFilter] = useState("")
  const [categoryFilter,setCategoryFilter] = useState("")
  const [searchText,setSearchText] = useState("")
  const [pageNumber,setPageNumber] = useState(1)
  const [optionSort,setOptionSort] = useState({propertyName: "", desc: 'false'})

  const [isLoading,setIsLoading] = useState(true)
  const [isReLoad,setIsReLoad] = useState(1)

  //Popup detail asset
  const [assetDetail,setAssetDetail] = useState()
  const [isDetailOpen,setIsDetailOpen] = useState(true)

  //Popup delete asset
  const [idAssetDelete,setIdAssetDelete] = useState("");
  const [isDeleteOpen,setIsDeleteOpen] = useState(false)
  const [isDelete,setIsDelete] = useState(false)

  //Table assets
  let assetPage = fetchPageAsset(stateFilter,categoryFilter,searchText,pageNumber,optionSort,isReLoad,setIsReLoad);
  checkLoading(setIsLoading,assetPage)
  
  let assets = assetPage.items;
  
  var categories = fetchCategories();

  deleteAsset(idAssetDelete,isDelete,setIsReLoad)
  
  const resetPage = () => {
      setPageNumber(1)
      setIsReLoad(1)
  }

  const handleSort = (e,option) =>{
      setOptionSort({propertyName:option.propertyName, desc: option.desc.toString()})
      setIsReLoad(1)
  }

  const handleSearch = (text,e) =>{
      resetPage()
      setSearchText(text)
      setIsReLoad(1)
  }
  const handleFilterState = (option,e) => {
    if(option!=null)
      setStateFilter(option.map((a,index)=>a.value).join(','))
    else
      setStateFilter("")
    resetPage()
    setIsReLoad(1)
  }

  const handleFilterCat = (option,e) => {
    if(option!=null)
      setCategoryFilter(option.map((a,index)=>a.id).join(','))
    else
      setCategoryFilter("")
    resetPage()
    setIsReLoad(1)
  }

  //Popup detail asset
  const handleDetail = (asset,e) =>{
    setAssetDetail(asset)
    setIsDetailOpen(true)
  }

  const handleModelShow = (isDetailOpen) =>{
    setIsDetailOpen(isDetailOpen)
  }

  //Popup delete asset
  const handleDeleteOpen = (id,e) => {
    console.log("delete open")
    setIdAssetDelete(id)
    handleDeleteShow(true)
  };

  const handleDeleteShow = (isDeleteOpen)=>{
    setIsDeleteOpen(isDeleteOpen)
  }

  const handleDelete = (e) =>{
    setIsDelete(true)
    handleDeleteShow(false)
  };

  function deletePopup(handleDelete,handleDeleteShow){
    if(1)
      return(
        <PopupDelete isModalOpen={isDeleteOpen} handleDelete ={handleDelete} handleModelShow = {handleDeleteShow}></PopupDelete>
      )
  }

  function detailAsset(assetDetail,isDetailOpen){
    if(assetDetail)
      return (
        <PopupDetailAsset asset = {assetDetail} isModalOpen={isDetailOpen} handleModelShow = {handleModelShow}/>
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
                  handleDeleteOpen = {handleDeleteOpen}
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
        setIsReLoad = {setIsReLoad}
        handleSort = {handleSort}
        handleFilterState = {handleFilterState}
        handleFilterCat = {handleFilterCat}
        handleSearch = {handleSearch}
      >
        {showAssets(assets, handleDeleteFunction)}
      </AssetList>
      {detailAsset(assetDetail,isDetailOpen)}
      {deletePopup(handleDelete,handleDeleteShow)}
    </div>
  );
}
function deleteAsset(id,isDelete,setReLoad){
  const dispatch = useDispatch()
  
  useEffect(()=>{
    async function deleteAsset(id) {
      const res = await apiCaller('Asset/'+id, 'Delete', null);
      dispatch({ type: action.DELETE_ASSET, payload: id });
      setReLoad(1)
    }
    if(id!=""){
      deleteAsset(id)
    }
  },[isDelete])

  
};
function fetchPageAsset(stateFilter,categoryFilter,searchText,pageNumber,optionSort = {propertyName: "", desc: "false"},isReLoad,setIsReLoad) {
  const dispatch = useDispatch()

  useEffect(() => {
    async function fetch() {
      let enpoint =
        "Asset/find?KeySearch=" +
        searchText +
        "&OrderProperty=" +
        optionSort.propertyName +
        "&Desc=" +
        optionSort.desc +
        "&Page=" +
        pageNumber +
        "&Limit=19";
      console.log(optionSort);
      const res = await apiCaller(enpoint, "GET", null);
      dispatch({ type: action.FETCH_ASSETS, payload: res.data });
    }
    if(isReLoad){
      fetch()
      setIsReLoad(0)
    }
  }, [isReLoad])

  const assetPage = useSelector(state => state.AssetReducer);

  const assetPage = useSelector((state) => state.AssetReducer);

function checkLoading(setIsLoading,page){
  useEffect(()=>{
    console.log(page)
      if('items' in page)
        setIsLoading(false)
  },[page])
}

function fetchCategories() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetch() {
      const res = await apiCaller("Category", "GET", null);
      dispatch({ type: actionCategory.FETCH_CATEGORY, payload: res.data });
    }
    fetch();
  }, []);

  const categories = useSelector((state) => state.CategoryReducer);

  return categories;
}

function filterAssets(assets, propertyName, arrayFilter) {
  if (arrayFilter == [] || !(propertyName in assets)) return assets;
  return assets.filter((asset) => arrayFilter.includes(asset[propertyName]));
}

function filterPageAsset(assetPage, stateFilter, categoryFilter) {
  let assets = null;
  useEffect(() => {
    async function filter() {
      console.log(assetPage);
      if (assetPage != null && "items" in assetPage) {
        assets = assetPage.items;
        //assets = filterAssets(assets,"state",stateFilter)
        //assets = filterAssets(assets,"category",categoryFilter)
      }
    }
    filter();
  }, [assetPage]);

  return assets;
}
function showAssets(assets, handleDeleteFunction) {
  let result = null;
  if (assets != null) {
    if (assets.length > 0) {
      result = assets.map((asset, index) => {
        return (
          <AssetItem
            key={index}
            asset={asset}
            index={index}
            stateList={stateList}
            handleDelete={handleDeleteFunction}
          />
        );
      });
    }
  }
  return result;
}

export default ManageAsset;
