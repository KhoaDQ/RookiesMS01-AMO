import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import callApi from "../../apis/callApi";
import { GET_ASSIGNMENT_BY_ID } from "../../actions/ManagerAssignment/ActionType";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";
import { IoMdCheckmark } from "@react-icons/all-files/io/IoMdCheckmark";
import { IoIosCloseCircleOutline } from "@react-icons/all-files/io/IoIosCloseCircleOutline";
import { MdSettingsBackupRestore } from "@react-icons/all-files/md/MdSettingsBackupRestore";
import PopupDetail from "../../components/Popup/PopupDetail";
import "./home.css";

function Home() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.oidc);
  const assignments = useSelector((state) => state.AssignmentReducer);

  async function fetchAssignment() {
    let endpoint = `assignment/user/${user.profile.sub}`;
    const res = await callApi(endpoint, "GET", null);

    dispatch({ type: GET_ASSIGNMENT_BY_ID, payload: res.data });
  }

  useEffect(() => {
    if (user != null) {
      fetchAssignment();
    }
  }, [user])

  const initSort = {
    assetCode: { propertyName: "assetCode", desc: true },
    assetName: { propertyName: "assetName", desc: true },
    category: { propertyName: "category", desc: true },
    assignedDate: { propertyName: "assignedDate", desc: true },
    state: { propertyName: "state", desc: true },
  };

  const [optionSort, setOptionSort] = useState(initSort);

  const handleClickSort = (nameProp) => {
    setOptionSort({
      ...optionSort,
      [nameProp]: { propertyName: nameProp, desc: !optionSort[nameProp].desc },
    });
  };

  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [clickedAssignment, setClickedAssignment] = useState({});
  const showDetail = (assignment) => {
    setClickedAssignment(assignment);
    setOpenDetailModal(true);
  };

  return (
    <div className="home">
      <h5 className="right-title">My Assignment</h5>
      <Table className="table_border_spacing">
        <thead>
          <tr style={{ cursor: "pointer" }}>
            <th
              onClick={() => {
                handleClickSort("assetCode");
              }}
            >
              Asset Code
              {optionSort.assetCode.desc ? (
                <AiFillCaretDown />
              ) : (
                <AiFillCaretUp />
              )}
            </th>
            <th
              onClick={() => {
                handleClickSort("assetName");
              }}
            >
              Asset Name
              {optionSort.assetName.desc ? (
                <AiFillCaretDown />
              ) : (
                <AiFillCaretUp />
              )}
            </th>
            <th
              onClick={() => {
                handleClickSort("category");
              }}
            >
              Category
              {optionSort.category.desc ? (
                <AiFillCaretDown />
              ) : (
                <AiFillCaretUp />
              )}
            </th>
            <th
              onClick={() => {
                handleClickSort("assignedDate");
              }}
            >
              Assigned Date
              {optionSort.assignedDate.desc ? (
                <AiFillCaretDown />
              ) : (
                <AiFillCaretUp />
              )}
            </th>
            <th
              onClick={() => {
                handleClickSort("state");
              }}
            >
              State
              {optionSort.state.desc ? <AiFillCaretDown /> : <AiFillCaretUp />}
            </th>
            <th id="tools" className="header_tools"></th>
          </tr>
        </thead>
        <tbody>
          {assignments.length > 0 ? (
            showAssignments(assignments, showDetail)
          ) : (
            <span
              style={{ width: "200px", display: "block", margin: "0 auto" }}
              className="rowNotify"
            >
              {" "}
              No assignments are found!{" "}
            </span>
          )}
        </tbody>
      </Table>
      <PopupDetail
        title="Detailed Assignment Information"
        content={clickedAssignment}
        handleModelShow={setOpenDetailModal}
        isModalOpen={openDetailModal}
      ></PopupDetail>
    </div>
  );
}

function showAssignments(assignments, showDetail) {
  let result = [];
  if (assignments != null || assignments.length > 0) {
    result = assignments.map((assignment, index) => {
      return (
        <tr key={assignment.id} onClick={() => showDetail(assignment)}>
          <td>{assignment.assetCode}</td>
          <td>{assignment.assetName}</td>
          <td>{assignment.category}</td>
          <td>{assignment.assignedDate}</td>
          <td>{assignment.state}</td>
          <td>
            <span className="icon-nash icon-nash--black">
              <Link>
                <IoMdCheckmark />
              </Link>
            </span>
            <span className="icon-nash icon-nash--red">
              <IoIosCloseCircleOutline />
            </span>
            <span className="icon-nash icon-nash--blue">
              <MdSettingsBackupRestore />
            </span>
          </td>
        </tr>
      );
    });
  }
  return result;
}

export default Home;