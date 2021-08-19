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
import Filter from "../../Filter";
import AssignmentPagination from "../../Pagination/AssignmentPagination";
import { AiFillCalendar } from "@react-icons/all-files/ai/AiFillCalendar";
import ReactPaginate from "react-paginate";

function AssignmentList(props) {
  const initSort = {
    Code: { propertyName: "Code", desc: true },
    Name: { propertyName: "Name", desc: true },
    AssignedTo: { propertyName: "AssignedTo", desc: true },
    AssignedBy: { propertyName: "AssignedBy", desc: true },
    AssignedDate: { propertyName: "AssignedDate", desc: true },
    State: { propertyName: "State", desc: true },
  }

  let { stateList, paging } = props

  const [searchText, setSearchText] = useState("")
  const [optionSort, setOptionSort] = useState(initSort);

  const handleChange = (e) => {
    setSearchText(e.target.value)
  }
  const handleClickSort = (nameProp, e) => {
    e.preventDefault()

    if (nameProp in optionSort) {
      optionSort[nameProp].desc = !optionSort[nameProp].desc
      props.handleSort(e, optionSort[nameProp])
    }
  }
  function changePage(event) {
    const currentPage = event.selected + 1;
    if (currentPage !== paging.page) {
      // setPaging(
      //     {
      //         ...paging, currentPage: currentPage
      //     })
    }
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
            placeholder="State" />
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
            <Input placeholder="Search" name="searchText" value={searchText} onChange={handleChange} />
            <InputGroupAddon addonType="append">
              <InputGroupText className="right__icon">
                <AiOutlineSearch />
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
          <tr>
            <th className='scale-col-5'>No.</th>
            <th onClick={(e) => { handleClickSort("Code", e) }}>Asset Code
              {optionSort.Code.desc ? <AiFillCaretDown /> : <AiFillCaretUp />}
            </th>
            <th onClick={(e) => { handleClickSort("Name", e) }} >Asset Name
              {optionSort.Name.desc ? <AiFillCaretDown /> : <AiFillCaretUp />}
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
      {/* <AssignmentPagination
        paging={paging}
      /> */}
      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        pageCount={paging.totalPages}
        marginPagesDisplayed={0}
        pageRangeDisplayed={2}
        containerClassName="pagination"
        pageLinkClassName="numberPage"
        onPageChange={(e) => changePage(e)}
        forcePage={paging.pageNumber - 1}
      />
    </div>

  );
}

export default AssignmentList;