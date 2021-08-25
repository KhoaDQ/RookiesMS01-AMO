import React, { Fragment, useState } from 'react';

function UserItemPick(props) {
  let { user } = props;

  return (
    <Fragment>
      <tr
        key={user.codeStaff}
        //onClick={handleShowInfoUser}
        className="detail-item"
      >
        <td>
          <input type="radio" name="select"></input>
        </td>
        <td>{user.codeStaff}</td>
        <td>
          {user.firstName} {user.lastName}
        </td>
        <td>{user.type}</td>
      </tr>
    </Fragment>
  );
}

export default UserItemPick;
