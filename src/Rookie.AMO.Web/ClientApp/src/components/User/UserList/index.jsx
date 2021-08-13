import React, { useState } from "react";
import { AiOutlineSearch } from "@react-icons/all-files/ai/AiOutlineSearch";
import { AiFillFilter } from "@react-icons/all-files/ai/AiFillFilter";
import { IoMdCreate } from "@react-icons/all-files/io/IoMdCreate";
import { IoIosCloseCircleOutline } from "@react-icons/all-files/io/IoIosCloseCircleOutline";
import { Link } from "react-router-dom";
import Pagination from "../../Pagination";

import {
  Col,
  Row,
  Button,
  InputGroupText,
  FormGroup,
  InputGroupAddon,
  Input,
  InputGroup,
} from "reactstrap";
import { Table } from "reactstrap";
import "./UserList.css";
function UserList(props) {
  const { stateList } = props
  const { roles } = stateList
  const [paging, setPaging] = useState({
    name: '',
    page: 1,
    limit: 1,
  });
  const handleChange = (e) => {
    let value = e.target.value;
    setPaging({ ...paging, name: value })
  }
  const type = roles.map((role, index) => {
    return (
      <option value={role.name} >{role.name}</option>
    )
  })
  return (
    <div>
      <h5 className="right-title">User List</h5>
      <Row className="right-bar">
        <Col md={3}>
          <InputGroup>
            <select
              className="custom-select custom-select-lg mb-3"
              className="form-control"
            >
              <option defaultValue >Select Type</option>
              {type}
            </select>

            <InputGroupText className="right__icon">
              <AiFillFilter />
            </InputGroupText>
          </InputGroup>
        </Col>
        <Col md={3}>
          <InputGroup>
            <Input placeholder="Search Name" value={paging.name} onChange={handleChange} />
            <InputGroupAddon addonType="append" onClick={() => { props.setPaging(paging) }} >
              <InputGroupText className="right__icon">
                <AiOutlineSearch />
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </Col>
        <Col md={6} className="text-right">
          <Button color="danger">
            <Link to="/create-user" className="UserIcon">
              Create New User
            </Link>
          </Button>
        </Col>
      </Row>
      <Table>
        <thead>
          <tr>
            <th>Staff Code</th>
            <th>Full Name</th>
            <th>Username</th>
            <th>Joined Date</th>
            <th>Type</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {props.totalItems > 0 ? props.children : (paging.name != "") ? <span>No users are found!</span> : <span>...Loading</span>}
        </tbody>
      </Table>
      {props.totalPages > 0 ? <Pagination totalPages={props.totalPages} pageNumber={props.pageNumber} setPageNumber={props.setPageNumber}  /> : null}
    </div>
  );
}

export default UserList;
