import React, { useState } from 'react'
import { IoMdCreate } from "@react-icons/all-files/io/IoMdCreate";
import { IoIosCloseCircleOutline } from "@react-icons/all-files/io/IoIosCloseCircleOutline";
import { Link } from "react-router-dom";
import "../style.css";
import axios from 'axios';
import { MdSettingsBackupRestore } from '@react-icons/all-files/md/MdSettingsBackupRestore';
function AssignmentItem(props) {
    let { assignment, index, stateList } = props

    return (
        <tr onClick={(e) => { props.handleDetail(assignment, e) }}>
            <td hover >{index}</td>
            <td>{assignment.assetCode}</td>
            <td>{assignment.assetName}</td>
            <td>{assignment.assignedTo}</td>
            <td>{assignment.assignedBy}</td>
            <td>{assignment.assignedDate}</td>
            <td>{assignment.state}</td>
            <td onClick={e => e.stopPropagation()}>
                <span className="icon-nash icon-nash--black">
                    <Link to={`/edit-assignments/${assignment.id}`}>
                        <IoMdCreate />
                    </Link>
                </span>
                <span className="icon-nash icon-nash--red">
                    <IoIosCloseCircleOutline onClick={(e) => { props.handleDeleteOpen(assignment.id, e) }} />
                </span>
                <span className="icon-nash icon-nash--blue">
                    <MdSettingsBackupRestore />
                </span>
            </td>
        </tr>
    )
}

export default AssignmentItem
