import React, { Fragment, useState } from "react";
function UserItemPick(props) {
  let { user, setUser, currentUser } = props;

  console.log(user.id === currentUser.id);

  const onChange = () => {
    setUser(user);
  };

  return (
    <Fragment>
      <tr
        key={user.codeStaff}
        //onClick={handleShowInfoUser}
        className="detail-item"
      >
        <td>
          <input
            type="radio"
            name="select"
            checked={user.id === currentUser.id}
            onChange={onChange}
          />
        </td>
        <td>{user.codeStaff} FFFFFF</td>
        <td>
          {user.firstName} {user.lastName}
        </td>
        <td>{user.type}</td>
      </tr>
    </Fragment>
  );
}
export default UserItemPick;
