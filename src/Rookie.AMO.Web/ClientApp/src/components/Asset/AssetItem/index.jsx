import React from 'react'
import { IoMdCreate } from "@react-icons/all-files/io/IoMdCreate";
import { IoIosCloseCircleOutline } from "@react-icons/all-files/io/IoIosCloseCircleOutline";
import { Link } from "react-router-dom";
function AssetItem(props) {
    let { asset, index } = props
    return(
        <tr>
        <td>{asset.code}</td>
        <td>Monitor Dell UltraSharp</td>
        <td>Monitor</td>
        <td>Available</td>
        <td>
        <span className="icon-nash icon-nash--black">
            <Link to="/editassets">
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
