import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";
import { AiOutlineSearch } from "@react-icons/all-files/ai/AiOutlineSearch";
import { AiFillCaretDown } from "@react-icons/all-files/ai/AiFillCaretDown";
import { AiFillCaretUp } from "@react-icons/all-files/ai/AiFillCaretUp";
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
import "../style.css";
import Pagination from "../../Pagination";
import Filter from "../../Filter";

const initSort = [
  { propertyName: "Code", desc: false },
  { propertyName: "Name", desc: true },
  { propertyName: "Category", desc: true },
  { propertyName: "State", desc: true },
];

function AssetList(props) {
  let { handleSort, handleSearch } = props;
  const [searchText, setSearchText] = useState("");
  const [optionSort, setOptionSort] = useState(initSort);

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };
  const handleClickSort = (optionSort, e) => {
    let nameProp = e.target.id;
    optionSort.filter((o) => o.propertyName == nameProp)[0].desc =
      !optionSort.filter((o) => o.propertyName == nameProp)[0].desc;
    handleSort(e, optionSort.filter((o) => o.propertyName == nameProp)[0]);
  };
  return (
    <div>
      <h5 className="right-title">Asset List</h5>
      <Row>
        <Col md={3}>
          <Filter
            options={props.stateList}
            displayValue="name"
            placeholder="State"
          />
        </Col>
        <Col md={3}>
          <Filter
            options={props.categories.map((category, index) => {
              return { name: category.name, id: index };
            })}
            displayValue="name"
            placeholder="Category"
          />
        </Col>
        <Col md={3}>
          <InputGroup>
            <Input
              placeholder="Search"
              name="searchText"
              value={searchText}
              onChange={handleChange}
            />
            <InputGroupAddon
              addonType="append"
              onClick={(e) => {
                handleSearch(searchText, e);
              }}
            >
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
      <Table className="table_border_spacing">
        <thead>
          <tr>
            <th
              id="Code"
              onClick={(e) => {
                handleClickSort(optionSort, e);
              }}
            >
              Asset Code
              {optionSort.filter((o) => o.propertyName == "Code")[0].desc ? (
                <AiFillCaretDown />
              ) : (
                <AiFillCaretUp />
              )}
            </th>
            <th
              id="Name"
              onClick={(e) => {
                handleClickSort(optionSort, e);
              }}
              className="header_name"
            >
              Asset Name
              {optionSort.filter((o) => o.propertyName == "Name")[0].desc ? (
                <AiFillCaretDown />
              ) : (
                <AiFillCaretUp />
              )}
            </th>
            <th
              id="Category"
              onClick={(e) => {
                handleClickSort(optionSort, e);
              }}
            >
              Category
              {optionSort.filter((o) => o.propertyName == "Category")[0]
                .desc ? (
                <AiFillCaretDown />
              ) : (
                <AiFillCaretUp />
              )}
            </th>
            <th
              id="State"
              onClick={(e) => {
                handleClickSort(optionSort, e);
              }}
            >
              State
              {optionSort.filter((o) => o.propertyName == "State")[0].desc ? (
                <AiFillCaretDown />
              ) : (
                <AiFillCaretUp />
              )}
            </th>
            <th className="header_tools"></th>
          </tr>
        </thead>
        <tbody>
          {props.totalItems > 0 ? (
            props.children
          ) : searchText != "" ? (
            <span>No assets are found!</span>
          ) : (
            <span>...Loading</span>
          )}
        </tbody>
      </Table>
      { props.totalItems > 0 ? <Pagination totalPages = {props.totalPages} pageNumber = {props.pageNumber} setPageNumber = {props.setPageNumber} setIsReLoad={props.setIsReLoad}/>:null}
    </div>
  );
}

export default AssetList;
