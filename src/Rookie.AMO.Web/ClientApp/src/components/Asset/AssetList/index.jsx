import React,{useState} from "react";
import { Table } from "reactstrap";
import { AiOutlineSearch } from "@react-icons/all-files/ai/AiOutlineSearch";
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
import "./style.css";
import Pagination from "../../Pagination";
import Filter from "../../Filter";
function AssetList(props){

  const [searchText,setSearchText] = useState("")
  const handleChange = (e) => {
    setSearchText(e.target.value)
  }
  return(
    <div>
      <h5 className="right-title">Asset List</h5>
      <Row from>
        <Col md={3}>
          <Filter options = {props.stateList} displayValue = "name" placeholder="State"/>
        </Col>
        <Col md={3}>
          <Filter 
            options = {props.categories.map((category, index) => {
                return({name:category.name,id:index})
              })} 
            displayValue ="name" 
            placeholder="Category"
          />     
        </Col>
        <Col md={3}>
          <InputGroup>
            <Input placeholder="Search" name = "searchText" value = {searchText} onChange={handleChange}/>
            <InputGroupAddon addonType="append" onClick={()=>{props.resetPage(); props.setSearchText(searchText)}} >
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
      <Table>
        <thead>
          <tr>
            <th>Asset Code</th>
            <th>Asset Name</th>
            <th>Category</th>
            <th>State</th>
            <th style={{width:"100px"}}></th>
          </tr>
        </thead>
        <tbody>
          {props.totalItems > 0 ? props.children : (searchText!="") ? <span>No assets are found!</span>:<span>...Loading</span>}
        </tbody>
      </Table>
      {props.totalPages > 1 ? <Pagination totalPages = {props.totalPages} pageNumber = {props.pageNumber} setPageNumber = {props.setPageNumber}/> : null}
    </div>

  );
}

export default AssetList;