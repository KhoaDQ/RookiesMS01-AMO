import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import apiCaller from "../../apis/callApi";
import * as action from "../../actions/ManagerAsset/ActionType";
import * as actionCategory from "../../actions/ManagerCategory/ActionType";
import AssetList from "../../components/Asset/AssetList";
import AssetItem from "../../components/Asset/AssetItem";
import PopupDetailAsset from "../../components/Popup/PopupDetailAsset";
import PopupDelete from "../../components/Popup/PopupDelete";
import queryString from "query-string";
import Moment from 'moment';
const stateList = [
  { name: "Assigned", value: "Assigned" },
  { name: "Available", value: "Available" },
  { name: "Not available", value: "NotAvailable" },
  { name: "Waiting for recycling", value: "WaitingRecycle" },
  { name: "Recycled", value: "Recycled" },
];

function ManageAsset() {
  // Table assets
  const [filterPage,setFilterPage] = useState({
    State : "Available, NotAvailable, Assigned",
    Category : "",
    KeySearch : "",
    OrderProperty: "", 
    Desc: false,
    Page: 1,
    Limit: 19
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isReload,setIsReload] = useState(0)

  const assetChange = useSelector((state) => state.AssetReducer.assetChange)


  // Popup detail asset
  const [assetDetail, setAssetDetail] = useState();
  const [isDetailOpen, setIsDetailOpen] = useState(true);

  // Popup delete asset
  const [idAssetDelete, setIdAssetDelete] = useState("");
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(0);

  // Table assets
  let assetPage = FetchPageAsset(filterPage,isReload);

  CheckLoading(setIsLoading, assetPage);

  var categories = FetchCategories();

  // Delete asset
  const triggerFetchAsset = () => setIsReload(t=>!t);
  DeleteAsset(idAssetDelete, isDelete, setIsDelete, triggerFetchAsset);
  
  //Popup detail asset
  const handleDetail = (asset, e) => {

    let stateAsset = stateList.find(({value}) => value == asset.state)
    if(stateAsset!=undefined)
      asset.state = stateAsset.name

    asset.installedDate = Moment(asset.installedDate).format('D/MM/yy');

    setAssetDetail(asset);
    setIsDetailOpen(true);
  };

  const handleModelShow = (isDetailOpen) => {
    setIsDetailOpen(isDetailOpen);
  };

  //Popup delete asset
  const handleDeleteOpen = (id, e) => {
    setIdAssetDelete(id);
    handleDeleteShow(true);
  };

  const handleDeleteShow = (isDeleteOpen) => {
    setIsDeleteOpen(isDeleteOpen);
  };

  const handleDelete = (e) => {
    setIsDelete(1);
    handleDeleteShow(false);
  };

  function deletePopup() {
      return (
        <PopupDelete
          isModalOpen={isDeleteOpen}
          handleDelete={handleDelete}
          handleModelShow={handleDeleteShow}
        ></PopupDelete>
      );
  }

  function detailAsset() {
    if (assetDetail)
      return (
        <PopupDetailAsset
          asset={assetDetail}
          isModalOpen={isDetailOpen}
          handleModelShow={handleModelShow}
        />
      );
  }

  function showAssets() {
    let result = null;
    if(!isLoading){

      let assets= assetPage.items;

      if (assets != null) {
        if (assets.length > 0) {

          if(assetChange != undefined)
            assets.splice(0,0,assetChange);
            
          let stateAsset = null   
          result = assets.map((asset, index) => {
            if(index == 0 && assetChange != undefined)
              index = -1
            stateAsset = stateList.find(({value}) => value == asset.state)
            if(stateAsset!=undefined)
              asset.state = stateAsset.name

            return (
              <AssetItem
                key={index}
                asset={asset}
                index={index}
                stateList={stateList}
                handleDetail={handleDetail}
                handleDeleteOpen={handleDeleteOpen}
              />
            );
          });
        }
      }
    }
    return result;
  }

  return (
    <div>
      <AssetList
        isLoading={isLoading}
        categories={categories}
        stateList={stateList}
        totalPages={assetPage.totalPages}
        totalItems={assetPage.totalItems}
        setFilterPage={setFilterPage}
        filterPage={filterPage}
      >
        {showAssets()}
      </AssetList>
      {detailAsset(assetDetail, isDetailOpen)}
      {deletePopup(handleDelete, handleDeleteShow)}
    </div>
  );
}
function DeleteAsset(id, isDelete, setIsDelete,triggerFetchAsset) {
  const dispatch = useDispatch();

  useEffect(() => {
    async function deleteAsset(id) {
      const res = await apiCaller("Asset/" + id, "Delete", null);
      dispatch({ type: action.DELETE_ASSET, payload: id });
    }
    if (isDelete && id != "") {
      deleteAsset(id).then(()=>{
        triggerFetchAsset();
        setIsDelete(0);
      });
    }
  }, [isDelete]);
}
function FetchPageAsset(filterPage,isReload) {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetch() {
      const paramsString = queryString.stringify(filterPage);
      let endpoint =`Asset/find?${paramsString}`
      const res = await apiCaller(endpoint, "GET", null);
      dispatch({ type: action.FETCH_ASSETS, payload: res.data });
    }
    fetch();
  }, [filterPage,isReload]);

  const assetPage = useSelector((state) => state.AssetReducer.payload);
  if(assetPage == undefined )
    return {};
  return assetPage;
}

function CheckLoading(setIsLoading, page) {
  useEffect(() => {
    if ("items" in page) setIsLoading(false);
  }, [page]);
}

function FetchCategories() {
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

export default ManageAsset;
