import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import apiCaller from "../../apis/apiCaller";
import * as action from "../../actions/ManageUser/ActionType";
import UserList from "../../components/User/UserList";
import UserItem from "../../components/User/UserItem";
function ManageUser() {
  const users = useSelector((state) => state.users);
  //   const dispatch = useDispatch();

  //   useEffect(() => {
  //     async function fetchUsers() {
  //       const res = await apiCaller("users", "GET", null);
  //       dispatch({ type: action.FETCH_USERS, payload: res });
  //     }
  //     fetchUsers();
  //   }, []);
  //   console.log(users);

  const showUsers = () => {
    let result = null;
    if (users.length > 0) {
      result = users.map((user, index) => {
        return <UserItem key={index} user={user} index={index} />;
      });
    }
    return result;
  };

  return <UserList>{showUsers()}</UserList>;
}

export default ManageUser;
