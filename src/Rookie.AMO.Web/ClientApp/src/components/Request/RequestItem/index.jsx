import React, { useState } from 'react';
import { BsCheck } from '@react-icons/all-files/bs/BsCheck';
import { IoCloseSharp } from '@react-icons/all-files/io5/IoCloseSharp';
import '../style.css';
function RequestItem(props) {
  let { request, index, stateList } = props;

  return (
    <tr>
      <th scope="row">{index}</th>
      <td>{request.assetCode}</td>
      <td>{request.assetName}</td>
      <td>{request.requestedBy}</td>
      <td>{request.assignedDate}</td>
      <td>{request.acceptedBy}</td>
      <td>{request.returnedDate}</td>
      <td>{stateList.filter((e) => e.value == request.state)[0].name}</td>{' '}
      <td onClick={(e) => e.stopPropagation()}>
        <span className="icon-nash icon-nash--red">
          <IoCloseSharp />
        </span>
        <span className="icon-nash icon-nash--black">
          <BsCheck />
        </span>
      </td>
    </tr>
  );
}

export default RequestItem;
