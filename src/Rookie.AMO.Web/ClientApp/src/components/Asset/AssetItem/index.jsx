import React, { useState } from "react";
import { IoMdCreate } from "@react-icons/all-files/io/IoMdCreate";
import { IoIosCloseCircleOutline } from "@react-icons/all-files/io/IoIosCloseCircleOutline";
import * as Config from "../../../constants/config";
import { Link } from "react-router-dom";
import "../style.css";
import axios from "axios";
function AssetItem(props) {
  let { asset, index, stateList } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleDelete = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const eventDelete = (id) => {
    axios.delete(`${Config.API_URL}/asset/${id}`).then((res) => {
      if (res.status === 204) {
        console.log("OKK");
        setIsModalOpen(false);
        props.handleDelete(true);
      }
    });
  };
  return (
    <div>
      <tr>
        <td>{asset.code}</td>
        <td>{asset.name}</td>
        <td>{asset.categoryName}</td>
        <td>{stateList.filter((e) => e.value == asset.state)[0].name}</td>
        <td>
          <span className="icon-nash icon-nash--black">
            <Link to="/editassets">
              <IoMdCreate />
            </Link>
          </span>
          <span onClick={handleDelete} className="icon-nash icon-nash--red">
            <IoIosCloseCircleOutline />
          </span>
        </td>
      </tr>
      <div
        className={"modal " + (isModalOpen ? "modal__open" : "modal__close")}
      >
        <div className="modal__overlay"></div>

        <div className="modal__body">
          <div className="auth-form">
            <div className="auth-form__header">
              <p className="auth-form__question">Are you sure?</p>
            </div>

            <div className="auth-form__body">
              <p className="auth-form__heading">
                Do you want to delete this asset?
              </p>
              <div className="auth-form__action">
                <button
                  onClick={() => eventDelete(asset.id)}
                  className="btn-accept"
                >
                  Delete
                </button>
                <button onClick={handleCancel} className="btn-cancel">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssetItem;
