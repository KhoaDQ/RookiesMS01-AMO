import React from "react";
import { Table } from "reactstrap";
import { IoMdCreate } from "@react-icons/all-files/io/IoMdCreate";
import { IoIosCloseCircleOutline } from "@react-icons/all-files/io/IoIosCloseCircleOutline";
import { MdSettingsBackupRestore } from "@react-icons/all-files/md/MdSettingsBackupRestore";
import { AiOutlineSearch } from "@react-icons/all-files/ai/AiOutlineSearch";
import { AiFillFilter } from "@react-icons/all-files/ai/AiFillFilter";
import { AiFillCalendar } from "@react-icons/all-files/ai/AiFillCalendar";
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
function ManageAssignment() {
  return (
    <div classname="Assignment">
      <h5 className="right-title">Assignment List</h5>
      <Row from>
        <Col md={3}>
          <InputGroup>
            <select
              className="custom-select custom-select-lg mb-3"
              className="form-control"
            >
              <option selected>Type</option>
              <option value={0}></option>
              <option value={1}>Accepted</option>
              <option value={2}>Waiting for acceptance</option>
            </select>

            <InputGroupAddon addonType="append">
              <InputGroupText className="right__icon">
                <AiFillFilter />
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </Col>
        <Col md={3}>
          <InputGroup>
            <input
              type="date"
              className="form-control "
              id="AssignedDate"
              name="AssignedDate"
            />
            <InputGroupAddon addonType="append">
              <InputGroupText className="right__icon">
                <AiFillCalendar />
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </Col>
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
        <Col md={3} className="text-right">
          <Button color="danger">
            <Link to="/createassignment" className="UserIcon">
              Create New Assignment
            </Link>
          </Button>
        </Col>
      </Row>
      <Table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Asset Code</th>
            <th>Asset Name</th>
            <th>Assigned to</th>
            <th>Assigned by</th>
            <th>Assigned Date</th>
            <th>State</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>MO100005</td>
            <td>Monitor Dell UltraSharp</td>
            <td>yentth</td>
            <td>tuanha</td>
            <td>15/03/2019</td>
            <td>Accepted</td>
            <td>
              <span className="icon-nash icon-nash--black">
                <Link to="/editassignment">
                  <IoMdCreate />
                </Link>
              </span>
              <span className="icon-nash icon-nash--red">
                <IoIosCloseCircleOutline />
              </span>
              <span className="icon-nash icon-nash--blue">
                <MdSettingsBackupRestore />
              </span>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default ManageAssignment;
