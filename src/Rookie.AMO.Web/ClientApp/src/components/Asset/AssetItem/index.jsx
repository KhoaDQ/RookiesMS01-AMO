import React from 'react'
import { IoMdCreate } from "@react-icons/all-files/io/IoMdCreate";
import { IoIosCloseCircleOutline } from "@react-icons/all-files/io/IoIosCloseCircleOutline";
import { Link } from "react-router-dom";
import "../style.css";
function AssetItem(props) {
    let { asset, index, stateList } = props
    return(
        <tr>
            <td>{asset.code}</td>
            <td>{asset.name}</td>
            <td>{asset.categoryName}</td>
            <td>{stateList.filter((e) => e.value == asset.state)[0].name}</td>
            <td>
            <span className="icon-nash icon-nash--black">
                <Link to={`/edit-assets/${asset.id}`} > 
                <IoMdCreate />
                </Link>
            </span>
            <span className="icon-nash icon-nash--red">
                <IoIosCloseCircleOutline />
            </span>
            </td>
        </tr>
    )
}

export default AssetItem
