import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import apiCaller from "../../apis/callApi";
import * as action from "../../actions/ManagerAsset/ActionType";
import * as actionCategory from "../../actions/ManagerCategory/ActionType";
import AssetList from "../../components/Asset/AssetList";
import AssetItem from "../../components/Asset/AssetItem";
import PopupInfor from "../../components/Popup/PopupInfor";

const stateList = [
  { name: "Assigned", value: "Assigned" },
  { name: "Available", value: "Available" },
  { name: "Not available", value: "NotAvailable" },
  { name: "Waiting for recycling", value: "Waiting" },
  { name: "Recycled", value: "Recycled" },
];

function ManageAsset() {
  const [stateFilter, setStateFilter] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [deleteIsSuccess, setDeleteIsSuccess] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [optionSort, setOptionSort] = useState({
    propertyName: "",
    desc: "false",
  });

  let assetPage = fetchPageAsset(
    searchText,
    pageNumber,
    setOptionSort,
    optionSort,
    deleteIsSuccess
  );

  var categories = fetchCategories();

  let assets = assetPage.items;

  const resetPage = () => {
    setPageNumber(1);
  };

  const handleSort = (e, option) => {
    setOptionSort({
      propertyName: option.propertyName,
      desc: option.desc.toString(),
    });
  };

  const handleSearch = (text, e) => {
    setSearchText(text);
  };

  const handleDeleteFunction = (content) => {
    setDeleteIsSuccess(content);
  };

  useEffect(() => {
    if (deleteIsSuccess != "" && deleteIsSuccess == true) {
      console.log("Moi delete xong");
      setIsModalOpen(true);
      setDeleteIsSuccess(false);
    }
  }, [deleteIsSuccess]);

  const handleModelShowFunction = (content) => {
    setIsModalOpen(content);
  };

  return (
    <div>
      <AssetList
        categories={categories}
        handleSearch={handleSearch}
        stateList={stateList}
        totalPages={assetPage.totalPages}
        totalItems={assetPage.totalItems}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        resetPage={resetPage}
        handleSort={handleSort}
      >
        {showAssets(assets, handleDeleteFunction)}
      </AssetList>
      <PopupInfor
        title="Information"
        content="Delete user successfully"
        handleModelShow={handleModelShowFunction}
        isModalOpen={isModalOpen}
        pathReturn="/manage-asset"
      ></PopupInfor>
    </div>
  );
}

function fetchPageAsset(
  searchText,
  pageNumber,
  setOptionSort,
  optionSort = { propertyName: "", desc: "false" },
  deleteIsSuccess
) {
  const dispatch = useDispatch();

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
    fetch();
  }, [
    searchText,
    pageNumber,
    optionSort.propertyName,
    optionSort.desc,
    deleteIsSuccess,
  ]);

  const assetPage = useSelector((state) => state.AssetReducer);

  return assetPage;
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
