import React from "react";
import { Table } from "reactstrap";
import { AiOutlineSearch } from "@react-icons/all-files/ai/AiOutlineSearch";
import { AiFillFilter } from "@react-icons/all-files/ai/AiFillFilter";
import { Link } from "react-router-dom";
import Select, { components } from "react-select";
import {
  Col,
  Row,
  Button,
  InputGroupText,
  InputGroupAddon,
  Input,
  InputGroup,
} from "reactstrap";

function AssetList(props){
    return(
      <div>
        <h5 className="right-title">Asset List</h5>
      <Row from>
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
              <option value={0}>All</option>
              {props.categories.map((category, index) => {
                  return(<option value={index+1}>{category.name}</option>)
                })
              }
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
          {props.children}
        </tbody>
      </Table>
    </div>
  );
}

export default AssetList;