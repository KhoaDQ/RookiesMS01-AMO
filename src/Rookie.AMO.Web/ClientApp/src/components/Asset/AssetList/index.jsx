import React,{useState} from "react";
import { Table } from "reactstrap";
import { AiOutlineSearch } from "@react-icons/all-files/ai/AiOutlineSearch";
import { AiFillFilter } from "@react-icons/all-files/ai/AiFillFilter";
import { Link } from "react-router-dom";
import { Multiselect } from 'multiselect-react-dropdown';
import ReactPaginate from 'react-paginate';
import {
  Col,
  Row,
  Button,
  InputGroupText,
  InputGroupAddon,
  Input,
  InputGroup,
} from "reactstrap";
import "./styleAsset.css";
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
          <Multiselect
              options={props.stateList}
              displayValue="name"
              showCheckbox={true}
              closeOnSelect={false}
              placeholder="State"
            />       

            <InputGroupAddon addonType="append">
              <InputGroupText className="right__icon">
                <AiFillFilter />
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </Col>
        <Col md={3}>
          <InputGroup >
            <Multiselect
              options={props.categories.map((category, index) => {
                return({name:category.name,id:index})
              })}
              displayValue="name"
              showCheckbox={true}
              closeOnSelect={false}
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
            <th></th>
          </tr>
        </thead>
        <tbody>
          {props.children}
        </tbody>
      </Table>
      <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          pageCount={10}
          marginPagesDisplayed={0}
          pageRangeDisplayed={2}
         
        />
    </div>

  );
}

export default AssetList;