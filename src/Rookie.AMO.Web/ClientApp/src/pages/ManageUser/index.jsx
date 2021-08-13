import queryString from 'query-string';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../actions/ManageUser/ActionType";
import apiCaller from "../../apis/callApi";
import UserItem from "../../components/User/UserItem";
import UserList from "../../components/User/UserList";
import { GetAllRolesSuccess } from "../../constants/RoleConstants";


function ManageUser() {
  // const [searchText, setSearchText] = useState("")
  const [pageNumber, setPageNumber] = useState(1)
  const [optionSort, setOptionSort] = useState({ propertyName: "", desc: false })
  const [paging, setPaging] = useState({
    name: '',
    page: 1,
    limit: 1,
  });
  const roles = useSelector((state) => state.getAllRoles);
  const userPage = useSelector((state) => state.UserReducer);
  const { createdUser } = useSelector((state) => state.createUser);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchRoles() {
      const res = await apiCaller("Role", "GET", null);
      dispatch({ type: GetAllRolesSuccess, payload: res.data });
    }
    fetchRoles();
  }, []);

  useEffect(() => {
    async function fetch() {
      //https://localhost:5011/api/User/find?name=%20&page=1&limit=3
      const paramsString = queryString.stringify(paging);
      let endpoint = `User/find?${paramsString}`;
      const res = await apiCaller(endpoint, 'GET', null);
      dispatch({ type: action.FETCH_USERS, payload: res.data });
    }
    fetch()
  }, [paging])

  const showUsers = () => {
    let result = null;

    if (userPage.items) {
      result = userPage.items.map((user, index) => {
        return <UserItem key={index} user={user} index={index} />;
      });
    }

    if (createdUser.id != null) {
      var createdUserRow = <UserItem key={"createdUser"} user={createdUser}/>;
      result.unshift(createdUserRow);
    }

    return result;
  };

  return <UserList
    stateList={roles}
    totalPages={userPage.totalPages}
    totalItems={userPage.totalItems}
    pageNumber={pageNumber}
    setPageNumber={setPageNumber}
    setPaging={setPaging}
  >{showUsers()}</UserList>;
}

export default ManageUser;
