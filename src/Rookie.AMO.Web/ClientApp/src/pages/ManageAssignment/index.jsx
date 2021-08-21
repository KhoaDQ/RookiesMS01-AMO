import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as action from '../../actions/ManagerAssignment/ActionType';
import apiCaller from '../../apis/callApi';
import AssignmentItem from "../../components/Assignment/AssignmentItem/";
import AssignmentList from "../../components/Assignment/AssignmentList";
import AssignmentPagination from "../../components/Pagination/AssignmentPagination";
import { format } from 'date-fns';

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
  const assignments = useSelector(state => state.AssignmentReducer);
  useEffect(() => {
    fetchAssignment()
  }, [filters])

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
        result = assignments.map((assignment, index) => {
          return (
            <AssignmentItem
              key={index}
              assignment={assignment}
              index={index}
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
      <AssignmentPagination
        filters={filters}
        setFilters={setFilters}
        paging={paging}
      />
    </div>
  );
}

export default ManageAssignment;
