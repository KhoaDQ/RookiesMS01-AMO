import React, { useEffect, useState, Fragment } from 'react';
import { IoMdCreate } from '@react-icons/all-files/io/IoMdCreate';
import { IoIosCloseCircleOutline } from '@react-icons/all-files/io/IoIosCloseCircleOutline';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import '../style.css';
import { MdSettingsBackupRestore } from '@react-icons/all-files/md/MdSettingsBackupRestore';
import PopupDetailAssignment from '../../Popup/PopupDetailAssignment';
import PopupDeleteAssignment from '../../Popup/PopupDeleteAssignment';
function AssignmentItem(props) {
  let { assignment, index } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleShowInfoAssignment() {
    setIsModalOpen(true);
  }

  const handleModelShowFunction = (content) => {
    setIsModalOpen(content);
  };

  let value = new Date(assignment.assignedDate);
  const dateString = format(value, 'dd/MM/yyyy');

  return (
    <Fragment>
      <tr onClick={handleShowInfoAssignment}>
        <td hover>{index + 1}</td>
        <td>{assignment.assetCode}</td>
        <td>{assignment.assetName}</td>
        <td>{assignment.assignedTo}</td>
        <td>{assignment.assignedBy}</td>

        <td>{dateString}</td>
        <td>{assignment.state}</td>
        <td onClick={(e) => e.stopPropagation()}>
          <span className={'icon-nash '}>
            <Link
              to={
                assignment.state == 'Waiting for Acceptance'
                  ? `/edit-assignments/${assignment.id}`
                  : '/manage-assignment'
              }
            >
              <IoMdCreate
                className={
                  assignment.state == 'Waiting for Acceptance'
                    ? 'icon-nash--black'
                    : 'icon-nash--black-dis'
                }
              />
            </Link>
          </span>

          <span
            className={
              'icon-nash ' +
              (assignment.state == 'Waiting for Acceptance'
                ? 'icon-nash--red'
                : 'icon-nash--red-dis')
            }
          >
            <IoIosCloseCircleOutline
              onClick={
                assignment.state == 'Waiting for Acceptance'
                  ? (e) => {
                      props.handleDeleteOpen(assignment.id, e);
                    }
                  : undefined
              }
            />
          </span>
          <span
            className={
              'icon-nash ' +
              (assignment.state == 'Accepted'
                ? 'icon-nash--blue'
                : 'icon-nash--blue-dis')
            }
          >
            <MdSettingsBackupRestore className={assignment.isReturnRequest?"returnDisable":""}
              onClick={
                assignment.state === 'Accepted' && !assignment.isReturnRequest
                  ? 
                   () => {
                      props.handleRequestOpen(assignment);
                    }
                    :undefined
                  
              }
            />
          </span>
        </td>
      </tr>
      <PopupDetailAssignment
        title="Detailed Assignment Information"
        assignment={assignment}
        handleModelShow={handleModelShowFunction}
        isModalOpen={isModalOpen}
      ></PopupDetailAssignment>
    </Fragment>
  );
}

export default AssignmentItem;
