import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as action from '../../actions/ManagerAssignment/ActionType';
import apiCaller from '../../apis/callApi';
import AssignmentItem from "../../components/Assignment/AssignmentItem/";
import AssignmentList from "../../components/Assignment/AssignmentList";
import AssignmentPagination from "../../components/Pagination/AssignmentPagination";
import PopupDeleteAssignment from "../../components/Popup/PopupDeleteAssignment";
import PopupInfor from '../../components/Popup/PopupInfor';
import { format } from 'date-fns';
import CreateRequest from "../Request/CreateRequest.jsx";

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
    Limit: 19,
    Desc: true,
    OrderProperty: 'AssetCode'
  })

  const [paging, setPaging] = useState({
    currentPage: 1,
    totalItems: 18,
    totalPages: 1,
  })

  const [isReload,setIsReload] = useState(0)
  const assignments = useSelector(state => state.AssignmentReducer);
  useEffect(() => {
    fetchAssignment()
  }, [filters,isReload])

  // return request
  const { user } = useSelector((state) => state.oidc);
  const {handleRequestOpen,showPopupRequest} = CreateRequest(user.profile.sub,user.profile.userName);

  async function fetchAssignment() {
    const paramsString = queryString.stringify(filters);
    let endpoint = `Assignment/find?${paramsString}`;
    // console.log(endpoint);
    const res = await apiCaller(endpoint, 'GET', null);
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
        let stateAssign = null
        result = assignments.map((assignment, index) => {
          stateAssign = stateList.find(s=>s.value === assignment.state)
          if(stateAssign!=undefined)
            assignment.state = stateAssign.name
          return (
            <AssignmentItem
              key={index}
              assignment={assignment}
              index={index}
              handleDeleteOpen={handleDeleteOpen}
              handleRequestOpen = {handleRequestOpen}
            />
          )
        })
      }
    }
    return result
  }



  const handleModelShowFunction = (content) => {
    setIsModalOpen(content);
  };

  // Popup delete assignment
  const [idAssignmentDelete, setIdAssignmentDelete] = useState("");
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Delete assignment
  const triggerFetchAssignment = () => setIsReload(t=>!t);
  DeleteAssignment(idAssignmentDelete, isDelete, setIsDelete, triggerFetchAssignment);

  //Popup delete assignment
  const handleDeleteOpen = (id, e) => {
    setIdAssignmentDelete(id);
    handleDeleteShow(true);
  };

  const handleDeleteShow = (isDeleteOpen) => {
    setIsDeleteOpen(isDeleteOpen);
  };

  const handleDelete = (e) => {
    setIsDelete(1);
    handleDeleteShow(false);
    setIsModalOpen(true);
  };

  function deletePopup() {
      return (
        <PopupDeleteAssignment
          isModalOpen={isDeleteOpen}
          handleDelete={handleDelete}
          handleModelShow={handleDeleteShow}
        ></PopupDeleteAssignment>
      );
  }

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
      <AssignmentPagination
        filters={filters}
        setFilters={setFilters}
        paging={paging}
      />
        {deletePopup(handleDelete, handleDeleteShow)}
        <PopupInfor
        title="Information"
        content="Delete assignment successfully"
        handleModelShow={handleModelShowFunction}
        isModalOpen={isModalOpen}
        pathReturn="/manage-assignment"
      ></PopupInfor>
      {showPopupRequest()}
    </div>
  );
}
function DeleteAssignment(id, isDelete, setIsDelete,triggerFetchAssignment) {
  const dispatch = useDispatch();

  useEffect(() => {
    async function deleteAssignment(id) {
      const res = await apiCaller("Assignment/" + id, "Delete", null);
      dispatch({ type: action.DELETE_ASSIGNMENT, payload: id });
    }
    if (isDelete && id != "") {
      deleteAssignment(id).then(()=>{
        triggerFetchAssignment();
        setIsDelete(0);
      });
    }
  }, [isDelete]);
}

export default ManageAssignment;
