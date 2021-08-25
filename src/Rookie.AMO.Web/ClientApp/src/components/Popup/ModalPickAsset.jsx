import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../actions/ManageUser/ActionType";
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

function ModalPickAsset(props) {
  const { assets } = props;
  const [pageNumber, setPageNumber] = useState(1);

  const [paging, setPaging] = useState({
    name: "",
    type: "",
    page: 1,
    limit: 3,
  });

  const userPage = useSelector((state) => state.UserReducer);
  const dispatch = useDispatch();
  const [currentAsset, setCurrentAsset] = useState(null);

  useEffect(() => {
    if (assets) {
      setCurrentAsset(assets?.[0]);
    }
  }, [assets]);

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
                  placeholder="Search Name"
                  name="name"
                  //onChange={handleChange}
                />
                <InputGroupAddon addonType="append">
                  <InputGroupText className="right__icon">
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
          {userPage.totalPages > 0 ? (
            <UserPagination
              //setPageReload={props.setPageReload} //
              paging={paging}
              setPaging={setPaging}
              totalPages={userPage.totalPages}
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
            />
          ) : null}
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

export default ModalPickAsset;
