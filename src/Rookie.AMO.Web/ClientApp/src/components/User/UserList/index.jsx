import React from "react";
import { AiOutlineSearch } from "@react-icons/all-files/ai/AiOutlineSearch";
import { AiFillFilter } from "@react-icons/all-files/ai/AiFillFilter";
import { IoMdCreate } from "@react-icons/all-files/io/IoMdCreate";
import { IoIosCloseCircleOutline } from "@react-icons/all-files/io/IoIosCloseCircleOutline";
import { Link } from "react-router-dom";

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
  return (
    <div>
      <h5 className="right-title">User List</h5>
      <Row from>
        <Col md={3}>
          <InputGroup>
            <select
              className="custom-select custom-select-lg mb-3"
              className="form-control"
            >
              <option selected>Type</option>
              <option value={0}></option>
              <option value={1}>Staff</option>
              <option value={2}>Customer</option>
            </select>

            <InputGroupText className="right__icon">
              <AiFillFilter />
            </InputGroupText>
          </InputGroup>
        </Col>
        {/* <InputGroupText className="right__icon">
                <AiFillFilter />
              </InputGroupText> */}
        <Col md={3}>
          <InputGroup>
            <Input placeholder="Search" />
            <InputGroupAddon addonType="append">
              <InputGroupText className="right__icon">
                <AiOutlineSearch />
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </Col>
        <Col md={6} className="text-right">
          <Button color="danger">
            <Link to="/createuser" className="UserIcon">
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
        {/* <tbody>{props.children}</tbody> */}
        <tbody>
          <tr>
            <td>MO100005</td>
            <td>Monitor Dell UltraSharp</td>
            <td>yentth</td>
            <td>15/03/2019</td>
            <td>Accepted</td>
            <td>
              <span className="icon-nash icon-nash--black">
                <Link to="/edituser">
                  <IoMdCreate />
                </Link>
              </span>
              <span className="icon-nash icon-nash--red">
                <IoIosCloseCircleOutline />
              </span>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default UserList;
