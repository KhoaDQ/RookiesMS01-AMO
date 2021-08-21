import React, { useState } from "react";
import { AiOutlineSearch } from "@react-icons/all-files/ai/AiOutlineSearch";
import { AiFillFilter } from "@react-icons/all-files/ai/AiFillFilter";
import { IoMdCreate } from "@react-icons/all-files/io/IoMdCreate";
import { IoIosCloseCircleOutline } from "@react-icons/all-files/io/IoIosCloseCircleOutline";
import { Link } from "react-router-dom";

import {
  Col,
  Row,
  Button,
  InputGroupText,
  FormGroup,
  InputGroupAddon,
  Input,
  InputGroup,
} from "reactstrap";
import { Table } from "reactstrap";
import "./UserList.css";
import UserPagination from "../../Pagination/UserPagination";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import Filter from "../../Filter";
const initSort = {
  StaffCode: { propertyName: "StaffCode", desc: true },
  FullName: { propertyName: "FullName", desc: true },
  JoinedDate: { propertyName: "JoinedDate", desc: true },
  Type: { propertyName: "Type", desc: true },
}
function UserList(props) {
  const { stateList } = props;
  const { roles } = stateList;
  console.log(roles);
  const { paging, setPaging } = props;
  const [tempPaging, setTempPaging] = useState(paging);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempPaging({ ...tempPaging, [name]: value });
  };
  const [optionSort, setOptionSort] = useState(initSort);

  // const type = roles.map((role, index) => {
  //   return <option value={role.name}>{role.name}</option>;
  // });

  const handleClickSort = (nameProp, e) => {
    e.preventDefault()

    if (nameProp in optionSort) {
      optionSort[nameProp].desc = !optionSort[nameProp].desc
      setPaging({ ...paging, propertyName: optionSort[nameProp].propertyName, Desc: optionSort[nameProp].desc })
    }
  }
  const handleFilterState = (option, e) => {
    if (option != null)
      setPaging({ ...paging, Type: option.map((a, index) => a.value).join(',') })
    else
      setPaging({ ...paging, Type: '' })
  }

  return (
    <div>
      <h5 className="right-title">User List</h5>
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
            <Input
              placeholder="Search"
              name="name"
              value={tempPaging.name}
              onChange={handleChange}
            />
            <InputGroupAddon
              addonType="append"
              onClick={() => {
                setPaging(tempPaging);
              }}
            >
              <InputGroupText className="right__icon">
                <AiOutlineSearch />
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </Col>
        <Col md={6} className="text-right">
          <Link to="/create-user" className="UserIcon">
            <Button color="danger">Create New User</Button>
          </Link>
        </Col>
      </Row>
      <Table className="table_border_spacing table">
        <thead>

          <tr style={{ cursor: 'pointer' }}>
            <th onClick={(e) => { handleClickSort("StaffCode", e) }}>Staff Code
              {optionSort.StaffCode.desc ? <AiFillCaretDown /> : <AiFillCaretUp />}
            </th>
            <th onClick={(e) => { handleClickSort("FullName", e) }} >Full Name
              {optionSort.FullName.desc ? <AiFillCaretDown /> : <AiFillCaretUp />}
            </th>
            <th>Username</th>
            <th onClick={(e) => { handleClickSort("JoinedDate", e) }}>Joined Date
              {optionSort.JoinedDate.desc ? <AiFillCaretDown /> : <AiFillCaretUp />}
            </th>
            <th className='scale-col-12' onClick={(e) => { handleClickSort("Type", e) }}>Type
              {optionSort.Type.desc ? <AiFillCaretDown /> : <AiFillCaretUp />}
            </th>
            <th className="header_tools"></th>
          </tr>
        </thead>
        <tbody>
          {props.totalItems > 0 ? (
            props.children
          ) : paging.name != "" ? (
            <span>No users are found!</span>
          ) : (
            <span>...Loading</span>
          )}
        </tbody>
      </Table>
      {props.totalPages > 0 ? (
        <UserPagination
          setPageReload={props.setPageReload}
          paging={paging}
          setPaging={props.setPaging}
          totalPages={props.totalPages}
          pageNumber={props.pageNumber}
          setPageNumber={props.setPageNumber}
        />
      ) : null}
    </div>
  );
}

export default UserList;
