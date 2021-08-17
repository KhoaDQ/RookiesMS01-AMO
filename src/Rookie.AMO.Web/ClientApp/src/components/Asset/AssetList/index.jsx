import React,{useState, useEffect} from "react";
import { Table } from "reactstrap";
import { AiOutlineSearch } from "@react-icons/all-files/ai/AiOutlineSearch";
import {AiFillCaretDown} from "@react-icons/all-files/ai/AiFillCaretDown";
import {AiFillCaretUp} from "@react-icons/all-files/ai/AiFillCaretUp";
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
import Filter from "../../Filter";
import AssetPagination from "../../Pagination/AssetPagination";

function AssetList(props){
  const initSort = {
    Code: {propertyName: "Code", desc: true},
    Name: {propertyName: "Name", desc: true},
    Category: {propertyName: "Category", desc: true},
    State: {propertyName: "State", desc: true},
  }

  let {handleSort, handleSearch, handleFilterState,handleFilterCat} = props

  const [searchText,setSearchText] = useState("")
  const [optionSort,setOptionSort] = useState(initSort);

  const handleChange = (e) => {
    setSearchText(e.target.value)
  }
  const handleClickSort = (nameProp,e) =>{
    e.preventDefault()

    if(nameProp in optionSort){
      optionSort[nameProp].desc = !optionSort[nameProp].desc
      handleSort(e,optionSort[nameProp])
    }
  }
  return(
    <div>
      <h5 className="right-title">Asset List</h5>
      <Row className="right-bar">
        <Col md={3}>
          <Filter
            options = {props.stateList}
            displayValue = "name"
            placeholder="State"
            handleFilter = {handleFilterState}/>
        </Col>
        <Col md={3}>
          <Filter
            options = {props.categories.map((category, index) => {
                return({name:category.name,id:category.id})
              })}
            displayValue ="name"
            placeholder="Category"
            handleFilter = {handleFilterCat}
          />
        </Col>
        <Col md={3}>
          <InputGroup>
            <Input placeholder="Search" name = "searchText" value = {searchText} onChange={handleChange}/>
            <InputGroupAddon addonType="append" onClick={(e) =>{handleSearch(searchText,e)}} >
              <InputGroupText className="right__icon">
                <AiOutlineSearch/>
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
            <th onClick={(e) =>{handleClickSort("Code",e)}}>Asset Code
            {optionSort.Code.desc?<AiFillCaretDown/>:<AiFillCaretUp/>}
            </th>
            <th onClick={(e) =>{handleClickSort("Name",e)}} className = "header_name">Asset Name
            {optionSort.Name.desc?<AiFillCaretDown/>:<AiFillCaretUp/>}
            </th>
            <th onClick={(e) =>{handleClickSort("Category",e)}}>Category
            {optionSort.Category.desc?<AiFillCaretDown/>:<AiFillCaretUp/>}
            </th>
            <th onClick={(e) =>{handleClickSort("State",e)}}>State
            {optionSort.State.desc?<AiFillCaretDown/>:<AiFillCaretUp/>}
            </th>
            <th className="header_tools"></th>
          </tr>
        </thead>
        <tbody>
          {props.isLoading ? <tr><td className="rowNotify">...Loading</td></tr> : props.totalItems > 0 ? props.children : <tr><td className="rowNotify"> No assets are found! </td></tr>}
        </tbody>
      </Table>
      { props.totalItems > 0 ? <AssetPagination totalPages = {props.totalPages} pageNumber = {props.pageNumber} setPageNumber = {props.setPageNumber} setIsReLoad={props.setIsReLoad}/>:null}
    </div>

  );
}

export default AssetList;