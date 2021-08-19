import React from 'react';
import { BsCheck } from '@react-icons/all-files/bs/BsCheck';
import { IoCloseSharp } from '@react-icons/all-files/io5/IoCloseSharp';
import moment from 'moment';
import '../style.css';
function RequestItem(props) {
  let { request, index, stateList } = props;

  return (
    <tr className="smallText">
      <th scope="row">{index}</th>
      <td>{request.assetCode}</td>
      <td>{request.assetName}</td>
      <td>{request.requestedBy}</td>
      <td>{moment(request.assignedDate).format('YYYY-MM-DD')}</td>
      <td>{request.acceptedBy}</td>
      <td>
        {request.returnedDate === '0001-01-01T00:00:00'
          ? null
          : moment(request.returnedDate).format('YYYY-MM-DD')}
      </td>
      <td>{stateList.filter((e) => e.value === request.state)[0].name}</td>
      <td onClick={(e) => e.stopPropagation()}>
        <span className="icon-nash icon-nash--red">
          <IoCloseSharp />
        </span>
        <span className="icon-nash icon-nash--black">
          <BsCheck
            onClick={(e) => {
              props.handleCompleteOpen(request.id, e);
            }}
          />
        </span>
      </td>
    </tr>
  );
}

export default RequestItem;
