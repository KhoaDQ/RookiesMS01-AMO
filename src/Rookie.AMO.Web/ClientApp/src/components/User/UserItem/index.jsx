import React, { Fragment, useState } from "react";
import { IoMdCreate } from "@react-icons/all-files/io/IoMdCreate";
import { IoIosCloseCircleOutline } from "@react-icons/all-files/io/IoIosCloseCircleOutline";
import PopupDetailUser from "../../../components/Popup/PopupDetailUser";
import { Link } from "react-router-dom";
import { format } from 'date-fns';

function UserItem(props) {
  let { user } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleShowInfoUser() {
    setIsModalOpen(true);
  }

  const handleModelShowFunction = (content) => {
    setIsModalOpen(content);
  };
  let value = new Date(user.joinedDate)
  const dateString = format(value, 'dd/MM/yyyy')
  return (
    <Fragment>
      <tr key={user.codeStaff} onClick={handleShowInfoUser} className="detail-item">
        <td>{user.codeStaff}</td>
        <td>
          {user.firstName} {user.lastName}
        </td>
        <td>{user.userName}</td>
        <td>{dateString}</td>
        <td >{user.type}</td>
        <td onClick={e => e.stopPropagation()}>
          <span className="icon-nash icon-nash--black">
            <Link to={`/edit-user/${user.id}`}>
              <IoMdCreate />
            </Link>
          </span>
          <span className="icon-nash icon-nash--red" onClick={() => { props.handleDeleteOpen(user.codeStaff) }}>
            <IoIosCloseCircleOutline />
          </span>
        </td>
      </tr>
      <PopupDetailUser
        title="Detailed User Information"
        user={user}
        handleModelShow={handleModelShowFunction}
        isModalOpen={isModalOpen}
      ></PopupDetailUser>
    </Fragment>
  );
}

export default UserItem;
