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

  const [searchText,setSearchText] = useState("")
  const [optionSort,setOptionSort] = useState(initSort);

  let {filterPage,setFilterPage} = props

  const resetPage = () => {
    setFilterPage({...filterPage,Page:1})
  };

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

  const handleSort = (e, option) => {
    setFilterPage({
      ...filterPage,
      OrderProperty: option.propertyName,
      Desc: option.desc,
    });
  };

  const handleSearch = (text, e) => {
    resetPage();
    setFilterPage({...filterPage, KeySearch: text});
  };

  const handleFilterState = (option, e) => {
    resetPage();
    if (option != null){
      setFilterPage({...filterPage, State: option.map((a, index) => a.value).join(",")});
      console.log(filterPage)
    }
    else {
      setFilterPage({...filterPage, State: ""});
    }
  };

  const handleFilterCat = (option, e) => {
    resetPage();
    
    if (option != null){
      setFilterPage({...filterPage, Category: option.map((a, index) => a.id).join(",")});
    }
    else{ 
      setFilterPage({...filterPage, Category: ""});
    }
  };

  return(
    <div>
      <h5 className="right-title">Asset List</h5>
      <Row className="right-bar">
        <Col md={3}>
          <Filter
            options = {props.stateList}
            defaultOption = {props.stateList.filter(s=> s.value == 'Available' || s.value == 'NotAvailable' || s.value == 'Assigned')}
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
      { props.totalItems > 0 ? <AssetPagination totalPages = {props.totalPages} pageNumber = {props.pageNumber} filterPage={filterPage} setFilterPage = {setFilterPage} />:null}
    </div>

  );
}

export default AssetList;