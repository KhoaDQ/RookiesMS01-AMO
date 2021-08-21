import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as action from '../../actions/ManageUser/ActionType';
import apiCaller from '../../apis/callApi';
import UserItemPick from '../../components/User/UserItemPick';
import { AiOutlineSearch } from '@react-icons/all-files/ai/AiOutlineSearch';
import '../User/UserList/UserList.css';
import UserPagination from '../Pagination/UserPagination';
import {
  Table,
  Col,
  Row,
  InputGroupText,
  InputGroupAddon,
  Input,
  InputGroup,
} from 'reactstrap';
import { Modal, Button } from 'react-bootstrap';

function ModalPickUser(props) {
  const [pageNumber, setPageNumber] = useState(1);

  const [paging, setPaging] = useState({
    name: '',
    type: '',
    page: 1,
    limit: 3,
  });

  const userPage = useSelector((state) => state.UserReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetch() {
      const paramsString = queryString.stringify(paging);
      console.log(paramsString);
      let endpoint = `User/find?${paramsString}`;
      const res = await apiCaller(endpoint, 'GET', null);
      dispatch({ type: action.FETCH_USERS, payload: res.data });
    }
    fetch();
  }, [paging]);

  const showUsers = () => {
    let result = null;
    if (userPage.items) {
      result = userPage.items.map((user, index) => {
        return <UserItemPick key={index} user={user} index={index} />;
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
              <h5 className="right-title">User List</h5>
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
                <th>Staff Code</th>
                <th>Full Name</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {userPage.totalItems > 0 ? (
                showUsers()
              ) : paging.name != '' ? (
                <span>No users are found!</span>
              ) : (
                <span>...Loading</span>
              )}
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
          <Button variant="danger" type="submit">
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

export default ModalPickUser;
