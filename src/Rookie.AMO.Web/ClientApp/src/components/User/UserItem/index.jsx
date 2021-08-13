import React, { Fragment, useState } from "react";
import { IoMdCreate } from "@react-icons/all-files/io/IoMdCreate";
import { IoIosCloseCircleOutline } from "@react-icons/all-files/io/IoIosCloseCircleOutline";
import PopupDetail from "../../../components/Popup/PopupDetail";
import { Link } from "react-router-dom";

function UserItem(props) {
  let { user } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleShowInfoUser() {
    setIsModalOpen(true);
  }
  const handleModelShowFunction = (content) => {
    setIsModalOpen(content);
  };
  return (
    <Fragment>
      <tr>
        <th className="detail-item" onClick={handleShowInfoUser}>
          {user.codeStaff}
        </th>
        <td>
          {user.firstName} {user.lastName}
        </td>
        <td>{user.username}</td>
        <td>{user.joinedDate}</td>
        <td>{user.type}</td>
        <td>
          <span className="icon-nash icon-nash--black">
            <Link to={`/edituser/${user.id}`}>
              <IoMdCreate />
            </Link>
          </span>
          <span className="icon-nash icon-nash--red">
            <IoIosCloseCircleOutline />
          </span>
        </td>
      </tr>
      <PopupDetail
        title="Detailed User Information"
        content={user}
        handleModelShow={handleModelShowFunction}
        isModalOpen={isModalOpen}
      ></PopupDetail>
    </Fragment>
  );
}

export default UserItem;
