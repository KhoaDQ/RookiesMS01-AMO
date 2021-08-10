import React,{useState} from "react";
import { Table } from "reactstrap";
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
          <InputGroup >
            <Filter options = {props.stateList} displayValue = "name" placeholder="State"/>
            <InputGroupAddon addonType="append">
              <InputGroupText className="right__icon">
                <AiFillFilter />
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </Col>
        <Col md={3}>
          <InputGroup >
            <Filter 
              options = {props.categories.map((category, index) => {
                  return({name:category.name,id:index})
                })} 
              displayValue ="name" 
              placeholder="Category"
            />     
            <InputGroupAddon addonType="append">
              <InputGroupText className="right__icon">
                <AiFillFilter />
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </Col>
        <Col md={3}>
          <InputGroup>
            <Input placeholder="Search" name = "searchText" value = {searchText} onChange={handleChange}/>
            <InputGroupAddon addonType="append" >
              <InputGroupText className="right__icon">
                <AiOutlineSearch onClick={()=>{props.setSearchText(searchText)}}/>
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
      {props.totalPages > 1 ? <Pagination totalPages = {props.totalPages}/> : null}
    </div>

  );
}

export default AssetList;