import { AiFillCalendar } from "@react-icons/all-files/ai/AiFillCalendar";
import { AiFillCaretDown } from "@react-icons/all-files/ai/AiFillCaretDown";
import { AiFillCaretUp } from "@react-icons/all-files/ai/AiFillCaretUp";
import { AiOutlineSearch } from "@react-icons/all-files/ai/AiOutlineSearch";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button, Col, Input,
  InputGroup, InputGroupAddon, InputGroupText, Row, Table
} from "reactstrap";
import Filter from "../../Filter";
import "../style.css";

function AssignmentList(props) {
  const initSort = {
    AssetCode: { propertyName: "AssetCode", desc: true },
    AssetName: { propertyName: "AssetName", desc: true },
    AssignedTo: { propertyName: "AssignedTo", desc: true },
    AssignedBy: { propertyName: "AssignedBy", desc: true },
    AssignedDate: { propertyName: "AssignedDate", desc: true },
    State: { propertyName: "State", desc: true },
  }

  let { stateList, filters, setFilters, paging } = props
  const [searchText, setSearchText] = useState("")
  const [filterDate, setFilterDate] = useState()
  const [optionSort, setOptionSort] = useState(initSort);

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'AssignedDate')
      setFilterDate(value)
    else
      setSearchText(value)
  }
  const handleClickSort = (nameProp, e) => {
    e.preventDefault()

    if (nameProp in optionSort) {
      optionSort[nameProp].desc = !optionSort[nameProp].desc
      // props.handleSort(e, optionSort[nameProp])
      console.log(optionSort[nameProp].propertyName, '-', optionSort[nameProp].desc);
      setFilters({ ...filters, OrderProperty: optionSort[nameProp].propertyName, Desc: optionSort[nameProp].desc })

    }
  }

  const handleSearch = (e) => {
    setFilters({ ...filters, KeySearch: searchText })
  }
  const handleFilterDate = (e) => {
    setFilters({ ...filters, AssignedDate: filterDate })
  }

  const handleSort = (e, option) => {
    setOptionSort({ propertyName: option.propertyName, desc: option.desc.toString() })
    // setIsReLoad(1)
  }

  const handleFilterState = (option, e) => {
    if (option != null)
      setFilters({ ...filters, State: option.map((a, index) => a.value).join(',') })
    else
      setFilters({ ...filters, State: '' })
    // setIsReLoad(1)
  }
  return (
    <div>
      <h5 className="right-title">Assignment List</h5>
      <Row className="right-bar">
        <Col md={3}>
          <Filter
            style={{ width: '200px' }}
            options={stateList}
            displayValue="name"
            handleFilter={handleFilterState}
            placeholder="State" />
        </Col>
        <Col md={3}>
          <InputGroup>
            <input
              type="date"
              className="form-control "
              id="AssignedDate"
              name="AssignedDate"
              value={filterDate}
              onChange={handleChange}
            />
            <InputGroupAddon addonType="append">
              <InputGroupText className="right__icon">
                <AiFillCalendar onClick={handleFilterDate} />
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </Col>
        <Col md={3}>
          <InputGroup>
            <Input placeholder="Search" name="searchText" value={searchText} onChange={handleChange} />
            <InputGroupAddon addonType="append">
              <InputGroupText className="right__icon">
                <AiOutlineSearch onClick={handleSearch} />
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </Col>
        <Col md={3} className="text-right">
          <Button color="danger">
            <Link to="/create-assignment" className="UserIcon">
              Create New Assignment
            </Link>
          </Button>
        </Col>
      </Row>

      <Table className="table_border_spacing">
        <thead>
          <tr style={{ cursor: 'pointer' }}>
            <th className='scale-col-5'>No.</th>
            <th onClick={(e) => { handleClickSort("AssetCode", e) }}>Asset Code
              {optionSort.AssetCode.desc ? <AiFillCaretDown /> : <AiFillCaretUp />}
            </th>
            <th onClick={(e) => { handleClickSort("AssetName", e) }} >Asset Name
              {optionSort.AssetName.desc ? <AiFillCaretDown /> : <AiFillCaretUp />}
            </th>
            <th onClick={(e) => { handleClickSort("AssignedTo", e) }}>Assigned to
              {optionSort.AssignedTo.desc ? <AiFillCaretDown /> : <AiFillCaretUp />}
            </th>
            <th onClick={(e) => { handleClickSort("AssignedBy", e) }}>Assigned by
              {optionSort.AssignedBy.desc ? <AiFillCaretDown /> : <AiFillCaretUp />}
            </th>
            <th onClick={(e) => { handleClickSort("AssignedDate", e) }}>Assigned date
              {optionSort.AssignedDate.desc ? <AiFillCaretDown /> : <AiFillCaretUp />}
            </th>
            <th className='scale-col-12' onClick={(e) => { handleClickSort("State", e) }}>State
              {optionSort.State.desc ? <AiFillCaretDown /> : <AiFillCaretUp />}
            </th>
            <th className="header_tools"></th>
          </tr>
        </thead>
        <tbody>
          {paging.totalItems > 0 ? props.children :
            <span style={{ width: '200px', display: 'block', margin: '0 auto' }} className="rowNotify"> No assets are found! </span>}
        </tbody>
      </Table>

    </div>

  );
}

export default AssignmentList;