import React from "react";
import {Table } from 'reactstrap';
import Moment from 'moment';
export default function AssetHistory(props){
    let {historyAsset} = props;
    console.log(historyAsset)
    return(    
        historyAsset.map((history,index)=>{
            return(
                <tr>
                    <td>{Moment(history.assignedDate).format('D/MM/yy')}</td>
                    <td>{history.assignedTo}</td>
                    <td>{history.assignedBy}</td>
                    <td>{history.returnedDate=== '0001-01-01T00:00:00'?"":Moment(history.returnedDate).format('D/MM/yy')}</td>
                </tr>
            )
        })
    )
}