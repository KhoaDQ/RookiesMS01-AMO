import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import callApi from '../../apis/callApi';
import { GET_ASSIGNMENT_BY_ID } from '../../actions/ManagerAssignment/ActionType';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import { Table } from 'reactstrap';
import { FaCheck } from '@react-icons/all-files/fa/FaCheck';
import { FaTimes } from '@react-icons/all-files/fa/FaTimes';
import { MdSettingsBackupRestore } from '@react-icons/all-files/md/MdSettingsBackupRestore';
import PopupDetail from '../../components/Popup/PopupDetail';
import PopupComplete from '../../components/Popup/PopupComplete';
import './home.css';
import { format } from 'date-fns';
import CreateRequest from '../Request/CreateRequest.jsx';
import * as ac from '../../actions//IndexCom/ActionType';

const stateList = {
  Accepted: 'Accepted',
  WaitingAccept: 'Waiting for Acceptance',
};
function Home() {
  const dispatch = useDispatch();
  //Popup accept assignment
  const [idAssignmentAccept, setIdAssignmentAccept] = useState('');
  const [isAcceptOpen, setIsAcceptOpen] = useState(false);
  const [isAccept, setIsAccept] = useState(0);

  //Popup decline assignment
  const [idAssignmentDecline, setIdAssignmentDecline] = useState('');
  const [isDeclineOpen, setIsDeclineOpen] = useState(false);
  const [isDecline, setIsDecline] = useState(0);

  dispatch({ type: ac.CHANGE_INDEX, payload: '' });
  const { user } = useSelector((state) => state.oidc);
  const assignments = useSelector((state) => state.AssignmentReducer);

  async function fetchAssignment() {
    let endpoint = `assignment/user/${user.profile.sub}`;
    const res = await callApi(endpoint, 'GET', null);
    dispatch({ type: GET_ASSIGNMENT_BY_ID, payload: res.data });
  }

  async function fetch() {
    if (isAccept === 1) {
      let endpoint = `assignment/accept/${idAssignmentAccept}`;
      const res = await callApi(endpoint, 'PUT', null);
      setIsAccept(0);
    }
    if (isDecline === 1) {
      let endpoint = `assignment/${idAssignmentDecline}`;
      const res = await callApi(endpoint, 'DELETE', null);
      setIsDecline(0);
    }
  }

  useEffect(() => {
    if (user != null || isAccept === 0 || isDecline === 0) {
      fetchAssignment();
    }
  }, [user, isAccept, isDecline]);

  useEffect(() => {
    if (isAccept === 1 || isDecline === 1) {
      fetch();
    }
  }, [isAccept, isDecline]);

  const initSort = {
    assetCode: { propertyName: 'assetCode', desc: true },
    assetName: { propertyName: 'assetName', desc: true },
    category: { propertyName: 'category', desc: true },
    assignedDate: { propertyName: 'assignedDate', desc: true },
    state: { propertyName: 'state', desc: true },
  };

  const [optionSort, setOptionSort] = useState(initSort);

  const handleClickSort = (nameProp) => {
    setOptionSort({
      ...optionSort,
      [nameProp]: { propertyName: nameProp, desc: !optionSort[nameProp].desc },
    });
  };

  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [clickedAssignment, setClickedAssignment] = useState({});
  const showDetail = (assignment) => {
    assignment.state = stateList[assignment.state];
    setClickedAssignment(assignment);
    setOpenDetailModal(true);
  };

  // return request
  const { handleRequestOpen, showPopupRequest } = CreateRequest(
    user.profile.sub,
    user.profile.userName
  );

  //Popup accept
  const handleAcceptOpen = (id, e) => {
    setIdAssignmentAccept(id);
    setIsAcceptOpen(true);
    handleAcceptShow(true);
  };

  const handleAcceptShow = (isOpen) => {
    setIsAcceptOpen(isOpen);
  };

  const handleAccept = (e) => {
    setIsAccept(1);
    handleAcceptShow(false);
    console.log(idAssignmentAccept);
  };

  //Popup decline
  const handleDeclineOpen = (id, e) => {
    setIdAssignmentDecline(id);
    setIsDeclineOpen(true);
    handleDeclineShow(true);
  };

  const handleDeclineShow = (isOpen) => {
    setIsDeclineOpen(isOpen);
  };

  const handleDecline = (e) => {
    setIsDecline(1);
    handleDeclineShow(false);
    console.log(idAssignmentDecline);
  };

  return (
    <div className="home">
      <h5 className="right-title">My Assignment</h5>
      <Table className="table_border_spacing">
        <thead>
          <tr style={{ cursor: 'pointer' }}>
            <th
              onClick={() => {
                handleClickSort('assetCode');
              }}
            >
              Asset Code
              {optionSort.assetCode.desc ? (
                <AiFillCaretDown />
              ) : (
                <AiFillCaretUp />
              )}
            </th>
            <th
              onClick={() => {
                handleClickSort('assetName');
              }}
            >
              Asset Name
              {optionSort.assetName.desc ? (
                <AiFillCaretDown />
              ) : (
                <AiFillCaretUp />
              )}
            </th>
            <th
              onClick={() => {
                handleClickSort('category');
              }}
            >
              Category
              {optionSort.category.desc ? (
                <AiFillCaretDown />
              ) : (
                <AiFillCaretUp />
              )}
            </th>
            <th
              onClick={() => {
                handleClickSort('assignedDate');
              }}
            >
              Assigned Date
              {optionSort.assignedDate.desc ? (
                <AiFillCaretDown />
              ) : (
                <AiFillCaretUp />
              )}
            </th>
            <th
              onClick={() => {
                handleClickSort('state');
              }}
            >
              State
              {optionSort.state.desc ? <AiFillCaretDown /> : <AiFillCaretUp />}
            </th>
            <th id="tools" className="header_tools"></th>
          </tr>
        </thead>
        <tbody>
          {assignments.length > 0 ? (
            showAssignments(
              assignments,
              showDetail,
              handleRequestOpen,
              handleAcceptOpen,
              handleDeclineOpen
            )
          ) : (
            <tr
              style={{ width: '200px', display: 'block', margin: '0 auto' }}
              className="rowNotify"
            >
              {' '}
              No assignments are found!{' '}
            </tr>
          )}
        </tbody>
      </Table>
      <PopupDetail
        title="Detailed Assignment Information"
        content={clickedAssignment}
        handleModelShow={setOpenDetailModal}
        isModalOpen={openDetailModal}
      ></PopupDetail>
      <PopupComplete
        isModalOpen={isAcceptOpen}
        handleComplete={handleAccept}
        handleModelShow={handleAcceptShow}
      ></PopupComplete>
      <PopupComplete
        isModalOpen={isDeclineOpen}
        handleComplete={handleDecline}
        handleModelShow={handleDeclineShow}
      ></PopupComplete>
      {showPopupRequest()}
    </div>
  );
}
function showAssignments(
  assignments,
  showDetail,
  handleRequestOpen,
  handleAcceptOpen,
  handleDeclineOpen
) {
  let result = [];
  if (assignments != null || assignments.length > 0) {
    result = assignments.map((assignment, index) => {
      console.log(assignment.isReturnRequest);
      return (
        <tr key={assignment.id} onClick={() => showDetail(assignment)}>
          <td>{assignment.assetCode}</td>
          <td>{assignment.assetName}</td>
          <td>{assignment.category}</td>
          <td>{format(new Date(assignment.assignedDate), 'dd/MM/yyyy')}</td>
          <td>{stateList[assignment.state]}</td>
          <td onClick={(e) => e.stopPropagation()}>
            <span
              className={
                'icon-nash ' +
                (assignment.state === 'WaitingAccept'
                  ? 'icon-nash--black'
                  : 'icon-nash--black-dis')
              }
            >
              <FaCheck
                onClick={
                  assignment.state === 'WaitingAccept'
                    ? (e) => {
                        handleAcceptOpen(assignment.id, e);
                      }
                    : undefined
                }
              />
            </span>
            <span
              className={
                'icon-nash ' +
                (assignment.state === 'WaitingAccept'
                  ? 'icon-nash--red'
                  : 'icon-nash--red-dis')
              }
            >
              <FaTimes
                onClick={
                  assignment.state === 'WaitingAccept'
                    ? (e) => {
                        handleDeclineOpen(assignment.id, e);
                      }
                    : undefined
                }
              />
            </span>
            <span
              className={
                'icon-nash ' +
                (assignment.state === 'Accepted'
                  ? 'icon-nash--blue'
                  : 'icon-nash--blue-dis')
              }
            >
              <MdSettingsBackupRestore
                onClick={
                  assignment.state === 'Accepted' && !assignment.isReturnRequest
                    ? () => handleRequestOpen(assignment)
                    : undefined
                }
              />
            </span>
          </td>
        </tr>
      );
    });
  }
  return result;
}

export default Home;
