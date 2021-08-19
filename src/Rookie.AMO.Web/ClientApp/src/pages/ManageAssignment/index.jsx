import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as action from '../../actions/ManagerAssignment/ActionType';
import apiCaller from '../../apis/callApi';
import AssignmentItem from "../../components/Assignment/AssignmentItem/";
import AssignmentList from "../../components/Assignment/AssignmentList";
// import PopupDelete from "../../components/Popup/PopupDelete";
// import PopupDetailAssignment from "../../components/Popup/PopupDetailAssignment";
function ManageAssignment() {
  const [stateFilter, setStateFilter] = useState("")
  const [AssignedDateFilterFilter, setAssignedDateFilterFilter] = useState("")
  const [searchText, setSearchText] = useState("")
  const [pageNumber, setPageNumber] = useState(1)
  const [optionSort, setOptionSort] = useState({ propertyName: "", desc: 'false' })

  const [isLoading, setIsLoading] = useState(true)
  const [isReLoad, setIsReLoad] = useState(1)

  //Popup detail assignment
  const [assignmentDetail, setAssignmentDetail] = useState()
  const [isDetailOpen, setIsDetailOpen] = useState(true)

  //Popup delete assignment
  const [idAssignmentDelete, setIdAssignmentDelete] = useState("");
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isDelete, setIsDelete] = useState(0)

  //Table assignments
  let assignmentPage = FetchPageAssignment(stateFilter, AssignedDateFilterFilter, searchText, pageNumber, optionSort, isReLoad, setIsReLoad);
  CheckLoading(setIsLoading, assignmentPage)

  let assignments = assignmentPage.items;


  DeleteAssignment(idAssignmentDelete, isDelete, setIsReLoad, setIsDelete)

  const resetPage = () => {
    setPageNumber(1)
    setIsReLoad(1)
  }

  const handleSort = (e, option) => {
    setOptionSort({ propertyName: option.propertyName, desc: option.desc.toString() })
    setIsReLoad(1)
  }

  const handleSearch = (text, e) => {
    resetPage()
    setSearchText(text)
    setIsReLoad(1)
  }
  const handleFilterState = (option, e) => {
    if (option != null)
      setStateFilter(option.map((a, index) => a.value).join(','))
    else
      setStateFilter("")
    resetPage()
    setIsReLoad(1)
  }

  const handleFilterCat = (option, e) => {
    if (option != null)
      setAssignedDateFilterFilter(option.map((a, index) => a.id).join(','))
    else
      setAssignedDateFilterFilter("")
    resetPage()
    setIsReLoad(1)
  }

  //Popup detail assignment
  const handleDetail = (assignment, e) => {
    setAssignmentDetail(assignment)
    setIsDetailOpen(true)
  }

  const handleModelShow = (isDetailOpen) => {
    setIsDetailOpen(isDetailOpen)
  }

  //Popup delete assignment
  const handleDeleteOpen = (id, e) => {
    console.log("delete open")
    setIdAssignmentDelete(id)
    handleDeleteShow(true)
  };

  const handleDeleteShow = (isDeleteOpen) => {
    setIsDeleteOpen(isDeleteOpen)
  }

  const handleDelete = (e) => {
    setIsDelete(1)
    handleDeleteShow(false)
  };

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
            // stateList = {stateList}
            // handleDetail = {handleDetail}
            // handleDeleteOpen = {handleDeleteOpen}
            />
          )
        })
      }
    }
    return result
  }
  return (
    <div classname="Assignment">

      <AssignmentList
      // isLoading={isLoading}
      // categories={categories}
      // stateList={stateList}
      // totalPages={assignmentPage.totalPages}
      // totalItems={assignmentPage.totalItems}
      // pageNumber={pageNumber}
      // setPageNumber={setPageNumber}
      // setIsReLoad={setIsReLoad}
      // handleSort={handleSort}
      // handleFilterState={handleFilterState}
      // handleFilterCat={handleFilterCat}
      // handleSearch={handleSearch}
      >
        {showAssignments(assignments)}
      </AssignmentList>
      {/* {detailAssignment(assignmentDetail, isDetailOpen)}
      {deletePopup(handleDelete, handleDeleteShow)} */}
    </div>
  );
  function DeleteAssignment(id, isDelete, setReLoad, setIsDelete) {
    const dispatch = useDispatch()

    useEffect(() => {
      async function deleteAssignment(id) {
        const res = await apiCaller('Assignment/' + id, 'Delete', null);
        dispatch({ type: action.DELETE_ASSIGNMENT, payload: id });
        setReLoad(1)
        setIsDelete(0)
      }
      if (id != "") {
        deleteAssignment(id)
      }
    }, [isDelete])


  };
  function FetchPageAssignment(stateFilter, AssignedDateFilterFilter, searchText, pageNumber, optionSort = { propertyName: "", desc: "false" }, isReLoad, setIsReLoad) {
    const dispatch = useDispatch()

    useEffect(() => {
      async function fetch() {
        let enpoint = 'Assignment/find?State=' + stateFilter + '&AssignedDateFilter=' + AssignedDateFilterFilter + '&KeySearch=' + searchText + '&OrderProperty=' + optionSort.propertyName + '&Desc=' + optionSort.desc + '&Page=' + pageNumber + '&Limit=5';

        console.log(enpoint)
        const res = await apiCaller(enpoint, 'GET', null);
        dispatch({ type: action.FETCH_ASSIGNMENTS, payload: res.data });
      }
      if (isReLoad) {
        fetch()
        setIsReLoad(0)
      }
    }, [isReLoad])

    const assignmentPage = useSelector(state => state.AssignmentReducer);

    return assignmentPage
  }

  function CheckLoading(setIsLoading, page) {
    useEffect(() => {
      console.log(page)
      if ('items' in page)
        setIsLoading(false)
    }, [page])
  }


}

export default ManageAssignment;
