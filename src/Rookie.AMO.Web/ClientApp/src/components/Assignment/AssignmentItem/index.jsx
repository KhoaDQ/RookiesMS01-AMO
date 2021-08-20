import React, { useEffect, useState } from 'react'
import { IoMdCreate } from "@react-icons/all-files/io/IoMdCreate";
import { IoIosCloseCircleOutline } from "@react-icons/all-files/io/IoIosCloseCircleOutline";
import { Link } from "react-router-dom";
import { format } from 'date-fns';
import "../style.css";
import axios from 'axios';
import { MdSettingsBackupRestore } from '@react-icons/all-files/md/MdSettingsBackupRestore';
import PopupDetail from '../../Popup/PopupDetail';
function AssignmentItem(props) {
    let { assignment, index } = props
    const [isModalOpen, setIsModalOpen] = useState(false);

    function handleShowInfoAssignment() {
        setIsModalOpen(true);
    }

    const handleModelShowFunction = (content) => {
        setIsModalOpen(content);
    };

    let value = new Date(assignment.assignedDate)
    const dateString = format(value, 'dd/MM/yyyy')
    console.log(dateString);

    return (
        <>
            <tr onClick={handleShowInfoAssignment}>
                <td hover >{index + 1}</td>
                <td>{assignment.assetCode}</td>
                <td>{assignment.assetName}</td>
                <td>{assignment.assignedTo}</td>
                <td>{assignment.assignedBy}</td>

                <td>{dateString}</td>
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
            <PopupDetail
                title="Detailed User Information"
                content={assignment}
                handleModelShow={handleModelShowFunction}
                isModalOpen={isModalOpen}
            ></PopupDetail>
        </>
    )
}

export default AssignmentItem
