import React from 'react'
import { IoMdCreate } from "@react-icons/all-files/io/IoMdCreate";
import { IoIosCloseCircleOutline } from "@react-icons/all-files/io/IoIosCloseCircleOutline";
import { Link } from "react-router-dom";
import "../style.css";
function AssetItem(props) {
    let { asset, index } = props;
    let isDisable = (asset.state ==="Assigned");
    return (
        <tr onClick = {(e)=>{props.handleDetail(asset,e)}} className = {index === -1 ? "newRow": ""}>
            <td >{asset.code}</td>
            <td>{asset.name}</td>
            <td>{asset.categoryName}</td>
            <td>{asset.state}</td>
            <td onClick={e => e.stopPropagation()}>
                <span className="icon-nash icon-nash--black">
                <Link to={isDisable?undefined:`/edit-assets/${asset.id}`}>
                        <IoMdCreate className = {isDisable?"assetDisable":""}/>
                    </Link>
                </span>
                <span className="icon-nash icon-nash--red">
                    <IoIosCloseCircleOutline className = {isDisable?"assetDisable":""} onClick={isDisable?undefined:(e) => {props.handleDeleteOpen(asset.id,e)}}/>
                </span>
            </td>
        </tr>
    )
}

export default AssetItem
