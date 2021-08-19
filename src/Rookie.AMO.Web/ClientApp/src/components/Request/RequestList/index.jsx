import React, { useState } from 'react';
import { Table } from 'reactstrap';
import { AiOutlineSearch } from '@react-icons/all-files/ai/AiOutlineSearch';
import { AiFillCaretDown } from '@react-icons/all-files/ai/AiFillCaretDown';
import { AiFillCaretUp } from '@react-icons/all-files/ai/AiFillCaretUp';
import { AiFillCalendar } from '@react-icons/all-files/ai/AiFillCalendar';
import {
  Col,
  Row,
  InputGroupText,
  InputGroupAddon,
  Input,
  InputGroup,
} from 'reactstrap';
import '../style.css';
import Filter from '../../Filter';
import RequestPagination from '../../Pagination/RequestPagination';

function RequestList(props) {
  const initSort = {
    Code: { propertyName: 'Code', desc: true },
    Name: { propertyName: 'Name', desc: true },
  };

  let { handleSort, handleSearch, handleFilterState, handleFilterDate } = props;

  const [searchText, setSearchText] = useState('');
  const [pickedDate, setPickedDate] = useState('');
  const [optionSort, setOptionSort] = useState(initSort);

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const handlePickDate = (e) => {
    setPickedDate(e.target.value);
  };

  const handleClickSort = (nameProp, e) => {
    e.preventDefault();

    if (nameProp in optionSort) {
      optionSort[nameProp].desc = !optionSort[nameProp].desc;
      handleSort(e, optionSort[nameProp]);
    }
  };
  return (
    <div className="request_list">
      <h5 className="right-title">Request List</h5>
      <Row className="right-bar">
        <Col md={3}>
          <Filter
            options={props.stateList}
            displayValue="name"
            placeholder="State"
            handleFilter={handleFilterState}
          />
        </Col>
        <Col md={3}>
          <InputGroup>
            <input
              type="date"
              className="form-control "
              id="AssignedDate"
              name="AssignedDate"
              value={pickedDate}
              onChange={handlePickDate}
            />

            <InputGroupAddon
              addonType="append"
              onClick={(e) => {
                handleFilterDate(pickedDate, e);
              }}
            >
              <InputGroupText className="right__icon">
                <AiFillCalendar />
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </Col>
        <Col md={2}></Col>
        <Col md={4}>
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
      </Row>
      <Table className="table_border_spacing">
        <thead>
          <tr className="smallText">
            <th className="header_no">No.</th>
            <th
              onClick={(e) => {
                handleClickSort('Code', e);
              }}
            >
              Asset Code
              {optionSort.Code.desc ? <AiFillCaretDown /> : <AiFillCaretUp />}
            </th>
            <th
              onClick={(e) => {
                handleClickSort('Name', e);
              }}
            >
              Asset Name
              {optionSort.Name.desc ? <AiFillCaretDown /> : <AiFillCaretUp />}
            </th>
            <th>Requested by</th>
            <th>Assigned Date</th>
            <th>Accepted by</th>
            <th>Returned Date</th>
            <th>State</th>
            <th className="header_tools"></th>
          </tr>
        </thead>
        <tbody>
          {props.isLoading ? (
            <tr>
              <td className="rowNotify">...Loading</td>
            </tr>
          ) : props.totalItems > 0 ? (
            props.children
          ) : (
            <tr>
              <td className="rowNotify">No Request for Returning are found!</td>
            </tr>
          )}
        </tbody>
      </Table>
      {props.totalItems > 0 ? (
        <RequestPagination
          totalPages={props.totalPages}
          pageNumber={props.pageNumber}
          setPageNumber={props.setPageNumber}
          setIsReLoad={props.setIsReLoad}
        />
      ) : null}
    </div>
  );
}

export default RequestList;
