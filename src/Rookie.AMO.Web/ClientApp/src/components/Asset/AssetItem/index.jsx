import React, {useState} from 'react'
import { IoMdCreate } from "@react-icons/all-files/io/IoMdCreate";
import { IoIosCloseCircleOutline } from "@react-icons/all-files/io/IoIosCloseCircleOutline";
import { Link } from "react-router-dom";
import "../style.css";
import axios from 'axios';
function AssetItem(props) {
    let { asset, index, stateList } = props
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleDelete = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const eventDelete = (id) => {
        axios.delete(`https://localhost:44388/api/asset/${id}`)
            .then(res => {
                if (res.status === 204) {
                    console.log("OKK");
                    setIsModalOpen(false);
                }
            });
    }
    return (
            <tr onClick = {(e)=>{props.handleDetail(asset,e)}}>
                <td hover >{asset.code}</td>
                <td>{asset.name}</td>
                <td>{asset.categoryName}</td>
                <td>{stateList.filter((e) => e.value == asset.state)[0].name}</td>
                <td>
                    <span className="icon-nash icon-nash--black">
                    <Link to={ `/edit-assets/${asset.id}`}>
                            <IoMdCreate />
                        </Link>
                    </span>
                    <span onClick={handleDelete} className="icon-nash icon-nash--red">
                        <IoIosCloseCircleOutline />
                    </span>
                </td>
            </tr>

    )
}

export default AssetItem
