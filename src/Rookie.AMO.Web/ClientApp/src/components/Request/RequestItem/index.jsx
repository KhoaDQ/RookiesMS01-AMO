import React from 'react';
import { FaCheck } from '@react-icons/all-files/fa/FaCheck';
import { FaTimes } from '@react-icons/all-files/fa/FaTimes';
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
        <span
          className={
            'icon-nash ' +
            (request.returnedDate === '0001-01-01T00:00:00'
              ? 'icon-nash--red'
              : 'icon-nash--red-dis')
          }
        >
          <FaCheck
            onClick={
              request.returnedDate === '0001-01-01T00:00:00'
                ? (e) => {
                    props.handleCompleteOpen(request.id, e);
                  }
                : undefined
            }
          />
        </span>
        <span
          className={
            'icon-nash ' +
            (request.returnedDate === '0001-01-01T00:00:00'
              ? 'icon-nash--black'
              : 'icon-nash--black-dis')
          }
        >
          <FaTimes
            onClick={
              request.returnedDate === '0001-01-01T00:00:00'
                ? (e) => {
                    props.handleCancelOpen(request.id, e);
                    console.log('dang click');
                  }
                : undefined
            }
          />
        </span>
      </td>
    </tr>
  );
}

export default RequestItem;
