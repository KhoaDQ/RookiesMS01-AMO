import React, { useState } from "react";
import { IoMdCreate } from "@react-icons/all-files/io/IoMdCreate";
import { IoIosCloseCircleOutline } from "@react-icons/all-files/io/IoIosCloseCircleOutline";
import * as Config from "../../../constants/config";
import { Link } from "react-router-dom";
import "../style.css";
import axios from "axios";
function AssetItem(props) {
    let { asset, index, stateList } = props

    return (
        <tr onClick = {(e)=>{props.handleDetail(asset,e)}}>
            <td hover >{asset.code}</td>
            <td>{asset.name}</td>
            <td>{asset.categoryName}</td>
            <td>{stateList.filter((e) => e.value == asset.state)[0].name}</td>
            <td onClick={e => e.stopPropagation()}>
                <span className="icon-nash icon-nash--black">
                <Link to={ `/edit-assets/${asset.id}`}>
                        <IoMdCreate />
                    </Link>
                </span>
                <span className="icon-nash icon-nash--red">
                    <IoIosCloseCircleOutline onClick={(e) => {props.handleDeleteOpen(asset.id,e)}}/>
                </span>
            </td>
        </tr>
    )
}

export default AssetItem;
