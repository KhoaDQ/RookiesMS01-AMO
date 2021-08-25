import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../actions/ManagerAsset/ActionType";
import apiCaller from "../../apis/callApi";
import AssetItemPicker from "../Asset/AssetItemPicker/AssetItemPicker";
import { AiOutlineSearch } from "@react-icons/all-files/ai/AiOutlineSearch";
import "../User/UserList/UserList.css";
import UserPagination from "../Pagination/UserPagination";
import {
  Table,
  Col,
  Row,
  InputGroupText,
  InputGroupAddon,
  Input,
  InputGroup,
  CustomInput,
} from "reactstrap";
import { Modal, Button } from "react-bootstrap";
import AssetPagination from "../Pagination/AssetPagination";

function ModalPickAsset(props) {
  const { user } = useSelector((state) => state.oidc);
  const initFilterPage = {
    Location: user.profile.location,
    State: 'Available',
    KeySearch: '',
    Page: 1,
    Limit: 2,
  }
  const [filterPage, setFilterPage] = useState(initFilterPage);

  const assetPage = FetchPageAsset(filterPage);

  let assets = null
  if(assetPage!=undefined && 'items' in assetPage)
    assets = assetPage.items

  const [pageNumber, setPageNumber] = useState(1);

  const [searchText, setSearchText] = useState("");

  const userPage = useSelector((state) => state.UserReducer);
  const dispatch = useDispatch();
  const [currentAsset, setCurrentAsset] = useState(null);

  useEffect(() => {
    if (assets) {
      setCurrentAsset(assets?.[0]);
    }
  }, [assets]);

  const { setState,setNameAsset } = props;
  useEffect(() => {
    if (currentAsset) {
      const { setState } = props;
      if (setState) {
        setState((state) => {
          return {
            ...state,
            asset: currentAsset?.id,
          };
        });
        setNameAsset(currentAsset?.name)
      }
    }
  }, [currentAsset]);

  // useEffect(() => {
  //   async function fetch() {
  //     const paramsString = queryString.stringify(paging);
  //     console.log(paramsString);
  //     let endpoint = `User/find?${paramsString}`;
  //     const res = await apiCaller(endpoint, "GET", null);
  //     dispatch({ type: action.FETCH_USERS, payload: res.data });
  //   }
  //   fetch();
  // }, [paging]);

  const showAssets = () => {
    // let result = null;
    // if (userPage.items) {
    //   result = userPage.items.map((user, index) => {
    //     return <UserItemPick key={index} user={user} index={index} />;
    //   });
    // }
    // return result;

    let result = null;

    if (assets) {
      console.log(assets);
      result = assets.map((asset, index) => {
        return (
          <AssetItemPicker
            key={index}
            asset={asset}
            index={index}
            currentAsset={currentAsset}
            setCurrentAsset={setCurrentAsset}
          />
        );
      });
    }

    return result;
  };

  return (
    <div>
      <Modal
        show={props.show}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <Row className="right-bar">
            <Col md={3}>
              <h5 className="right-title">Asset List</h5>
            </Col>
            <Col md={3}></Col>
            <Col md={6}>
              <InputGroup>
                <Input
                  value={searchText}
                  placeholder="Search Name"
                  name="name"
                  onChange={(e)=>{setSearchText(e.target.value)}}
                />
                <InputGroupAddon addonType="append">
                  <InputGroupText className="right__icon" onClick={()=>{setFilterPage({...filterPage, KeySearch: searchText})}}>
                    <AiOutlineSearch />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Col>
          </Row>
          <Table className="table_border_spacing table">
            <thead>
              <tr>
                <th>Choose</th>
                <th>Asset Code</th>
                <th>Asset Name</th>
                <th>Category</th>
                <th>State</th>
              </tr>
            </thead>

            <tbody>
              {/* {userPage.totalItems > 0 ? (
                showUsers()
              ) : paging.name != "" ? (
                <span>No users are found!</span>
              ) : (
                <span>...Loading</span>
              )} */}
              {showAssets()}
            </tbody>
          </Table>
          <AssetPagination 
            totalPages = {assetPage.totalPages} 
            pageNumber = {assetPage.pageNumber} 
            filterPage={filterPage} 
            setFilterPage = {setFilterPage} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" type="submit" onClick={props.onHide}>
            Save
          </Button>
          <Button variant="light" onClick={props.onHide}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

function FetchPageAsset(filterPage) {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetch() {
      const paramsString = queryString.stringify(filterPage);
      let endpoint = `Asset/find?${paramsString}`;
      const res = await apiCaller(endpoint, 'GET', null);
      dispatch({ type: action.FETCH_ASSETS, payload: res.data });
    }
    fetch();
  }, [filterPage]);

  const assetPage = useSelector((state) => state.AssetReducer.payload);

  if (assetPage == undefined) return {};

  return assetPage;
}

export default ModalPickAsset;
