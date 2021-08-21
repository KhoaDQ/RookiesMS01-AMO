import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../actions/ManageUser/ActionType";
import apiCaller from "../../apis/callApi";
import UserItem from "../../components/User/UserItem";
import UserList from "../../components/User/UserList";
import PopupDelete from "../../components/Popup/PopupDelete";
const stateList = [
  { name: "Admin", value: "Admin" },
  { name: "Staff", value: "Staff" }
]
function ManageUser() {
  const [pageNumber, setPageNumber] = useState(1);
  const [paging, setPaging] = useState({
    name: "",
    type: "",
    page: 1,
    limit: 19,
    propertyName: "StaffCode",
    desc: false,
  });

  const userPage = useSelector((state) => state.UserReducer);
  const { createdUser } = useSelector((state) => state.createUser);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetch() {
      const paramsString = queryString.stringify(paging);
      console.log(paramsString);
      let endpoint = `User/find?${paramsString}`;
      const res = await apiCaller(endpoint, "GET", null);
      dispatch({ type: action.FETCH_USERS, payload: res.data });
    }
    fetch();
  }, [paging]);

  function handleDeleteOpen() {
    console.log('okie');
  }
  const showUsers = () => {
    let result = null;

    if (userPage.items) {
      if (createdUser.id != null) {
        var index = userPage.items.findIndex((x) => x.id === createdUser.id);
        if (index === -1) {
          userPage.items.pop();
        }
        else {
          userPage.items.splice(index, 1);
        }
        userPage.items.unshift(createdUser);
      }

      result = userPage.items.map((user, index) => {
        return <UserItem
          key={index}
          user={user}
          index={index}
          handleDeleteOpen={handleDeleteOpen} />;
      });
    }

    return result;
  };

  return (
    <UserList
      stateList={stateList}
      totalPages={userPage.totalPages}
      totalItems={userPage.totalItems}
      pageNumber={pageNumber}
      setPageNumber={setPageNumber}
      setPaging={setPaging}
      paging={paging}
    >
      {showUsers()}
    </UserList>
  );
}

export default ManageUser;
