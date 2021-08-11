import React from "react";
import { Table } from "reactstrap";
import { IoMdCreate } from "@react-icons/all-files/io/IoMdCreate";
import { IoIosCloseCircleOutline } from "@react-icons/all-files/io/IoIosCloseCircleOutline";
import { AiOutlineSearch } from "@react-icons/all-files/ai/AiOutlineSearch";
import { AiFillFilter } from "@react-icons/all-files/ai/AiFillFilter";
import { Link } from "react-router-dom";
import {
  Col,
  Row,
  Button,
  InputGroupText,
  InputGroupAddon,
  Input,
  InputGroup,
} from "reactstrap";
function ManageAsset() {
  return (
    <div>
      <h5 className="right-title">Asset List</h5>
      <Row className="right-bar">
        <Col md={3}>
          <InputGroup>
            <select
              className="custom-select custom-select-lg mb-3"
              className="form-control"
            >
              <option selected>State</option>
              <option value={0}></option>
              <option value={1}>Available</option>
              <option value={2}>Not Available</option>
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
            <select
              className="custom-select custom-select-lg mb-3"
              className="form-control"
            >
              <option selected>Category</option>
              <option value={0}></option>
              <option value={1}>Laptop</option>
              <option value={2}>Monitor</option>
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
            <Link to="/createassets" className="UserIcon">
              Create New Assets
            </Link>
          </Button>
        </Col>
      </Row>
      <Table>
        <thead>
          <tr>
            <th>Asset Code</th>
            <th>Asset Name</th>
            <th>Category</th>
            <th>State</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>MO100005</td>
            <td>Monitor Dell UltraSharp</td>
            <td>Monitor</td>
            <td>Available</td>
            <td>
              <span className="icon-nash icon-nash--black">
                <Link to="/editassets">
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

export default ManageAsset;
