import React from 'react'
import { IoMdCreate } from "@react-icons/all-files/io/IoMdCreate";
import { IoIosCloseCircleOutline } from "@react-icons/all-files/io/IoIosCloseCircleOutline";
function UserItem(props) {
    let { user, index } = props
    return (
        <tr>
            <th scope="row">{user.staffcode}</th>
            <td>{user.fullname}</td>
            <td>{user.fullname}</td>
            <td>{user.joineddate}</td>
            <td>{user.type}</td>
            <td>
                <span className='icon-nash icon-nash--black'>
                    <IoMdCreate />
                </span>
                <span className='icon-nash icon-nash--red'>

                    <IoIosCloseCircleOutline />
                </span>
            </td>
        </tr>
    )
}

export default UserItem
