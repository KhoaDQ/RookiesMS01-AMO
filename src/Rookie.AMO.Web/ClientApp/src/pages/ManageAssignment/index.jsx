import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as action from '../../actions/ManagerAssignment/ActionType';
import apiCaller from '../../apis/callApi';
import AssignmentItem from "../../components/Assignment/AssignmentItem/";
import AssignmentList from "../../components/Assignment/AssignmentList";
import queryString from "query-string";

// import PopupDelete from "../../components/Popup/PopupDelete";
// import PopupDetailAssignment from "../../components/Popup/PopupDetailAssignment";
const stateList = [
  { name: "Accepted", value: "Accepted" },
  { name: "Waiting for Acceptance", value: "WaitingAccept" }
]
function ManageAssignment() {
  const dispatch = useDispatch()

  const [filters, setFilters] = useState({
    KeySearch: '',
    Page: 1,
    State: '',
    Limit: 10,
    Desc: false,
    OrderProperty: 'AssetCode'
  })

  const [paging, setPaging] = useState({
    currentPage: 1,
    totalItems: 18,
    totalPages: 1,
  })
  const assignments = useSelector(state => state.AssignmentReducer);

  // const [optionSort, setOptionSort] = useState({ propertyName: "", desc: 'false' })

  // // const [isLoading, setIsLoading] = useState(true)
  // // const [isReLoad, setIsReLoad] = useState(1)

  // //Popup detail assignment
  // const [assignmentDetail, setAssignmentDetail] = useState()
  // const [isDetailOpen, setIsDetailOpen] = useState(true)

  // //Popup delete assignment
  // const [idAssignmentDelete, setIdAssignmentDelete] = useState("");
  // const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  // const [isDelete, setIsDelete] = useState(0)

  // DeleteAssignment(idAssignmentDelete, isDelete, setIsReLoad, setIsDelete)

  // const resetPage = () => {
  //   setFilters({ ...filters, pageNumber: 1 })
  //   // setIsReLoad(1)
  // }

  // const handleSort = (e, option) => {
  //   setOptionSort({ propertyName: option.propertyName, desc: option.desc.toString() })
  //   // setIsReLoad(1)
  // }

  // const handleSearch = (text, e) => {
  //   resetPage()
  //   setFilters({ ...filters, searchText: text })

  //   // setIsReLoad(1)
  // }
  // const handleFilterState = (option, e) => {
  //   if (option != null)
  //     setFilters({ ...filters, stateFilter: option.map((a, index) => a.value).join(',') })
  //   else
  //     setFilters({ ...filters, stateFilter: '' })
  //   resetPage()
  //   // setIsReLoad(1)
  // }

  

  //Popup detail assignment
  // const handleDetail = (assignment, e) => {
  //   <PopupDetail
  //           title="Detailed Assignment Information"
  //           content={assignment}
  //           handleModelShow={handleModelShowFunction}
  //           isModalOpen={isModalOpen}
  //         ></PopupDetail>
  //   setAssignmentDetail(assignment)
  //   setIsDetailOpen(true)
  // }

  // const handleModelShow = (isDetailOpen) => {
  //   setIsDetailOpen(isDetailOpen)
  // }

  // //Popup delete assignment
  // const handleDeleteOpen = (id, e) => {
  //   console.log("delete open")
  //   setIdAssignmentDelete(id)
  //   handleDeleteShow(true)
  // };

  // const handleDeleteShow = (isDeleteOpen) => {
  //   setIsDeleteOpen(isDeleteOpen)
  // }

  // const handleDelete = (e) => {
  //   setIsDelete(1)
  //   handleDeleteShow(false)
  // };

  // function deletePopup(handleDelete, handleDeleteShow) {
  //   if (1)
  //     return (
  //       <PopupDelete isModalOpen={isDeleteOpen} handleDelete={handleDelete} handleModelShow={handleDeleteShow}></PopupDelete>
  //     )
  // }

  // function detailAssignment(assignmentDetail, isDetailOpen) {
  //   if (assignmentDetail)
  //     return (
  //       <PopupDetailAssignment assignment={assignmentDetail} isModalOpen={isDetailOpen} handleModelShow={handleModelShow} />
  //     )
  // }
  useEffect(() => {
    fetchAssignment()
  }, [filters])

  async function fetchAssignment() {
    const paramsString = queryString.stringify(filters);
    let endpoint = `Assignment/find?${paramsString}`;
    // console.log(endpoint);
    const res = await apiCaller(endpoint, 'GET', null);
    // console.log(res);
    setPaging(
      {
        currentPage: res.data.currentPage,
        totalItems: res.data.totalItems,
        totalPages: res.data.totalPages
      }
    )
    dispatch({ type: action.FETCH_ASSIGNMENTS, payload: res.data.items });
  }

  function showAssignments(assignments) {
    let result = null
    if (assignments != null) {
      if (assignments.length > 0) {
        result = assignments.map((assignment, index) => {
          return (
            <AssignmentItem
              key={index}
              assignment={assignment}
              index={index}
            // stateList={stateList}
            // handleDeleteOpen = {handleDeleteOpen}
            />
          )
        })
      }
    }
    return result
  }

  console.log(filters);

  return (
    <div className="Assignment">

      <AssignmentList
        stateList={stateList}
        filters={filters}
        setFilters={setFilters}
        paging={paging}
      >
        {showAssignments(assignments)}
      </AssignmentList>
      {/* {detailAssignment(assignmentDetail, isDetailOpen)}
      {deletePopup(handleDelete, handleDeleteShow)} */}
    </div>
  );
}

export default ManageAssignment;
