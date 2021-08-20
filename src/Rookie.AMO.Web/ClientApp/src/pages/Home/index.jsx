import React from 'react'
import { Table } from 'reactstrap';
import { useState } from 'react';
import AssignmentPagination from '../../components/Pagination/AssignmentPagination';
import { AiFillCaretUp, AiFillCaretDown } from '@react-icons/all-files/ai/AiFillCaretUp';

function Home() {
  const initSort = {
    AssetCode: { propertyName: "Code", desc: true },
    AssetName: { propertyName: "Name", desc: true },
    AssignedTo: { propertyName: "AssignedTo", desc: true },
    AssignedBy: { propertyName: "AssignedBy", desc: true },
    AssignedDate: { propertyName: "AssignedDate", desc: true },
    State: { propertyName: "State", desc: true },
  }

  let { stateList, paging } = props;
  const [optionSort, setOptionSort] = useState(initSort);
  
  const handleSort = (e, option) => {
    setOptionSort({ propertyName: option.propertyName, desc: option.desc.toString() });
  };

  const handleClickSort = (nameProp, e) => {
    e.preventDefault();

    if (nameProp in optionSort) {
      optionSort[nameProp].desc = !optionSort[nameProp].desc;
      handleSort(e, optionSort[nameProp]);
    }
  };

  return (
    <div className="home">
      <h5 className="right-title">My Assignment</h5>
      <Table className="table_border_spacing">
        <thead>
          <tr style={{cursor:'pointer'}}>
            <th className='scale-col-5'>No.</th>
            <th onClick={(e) => { handleClickSort("AssetCode", e) }}>Asset Code
              {optionSort.AssetCode.desc ? <AiFillCaretDown /> : <AiFillCaretUp />}
            </th>
            <th onClick={(e) => { handleClickSort("AssetName", e) }} >Asset Name
              {optionSort.AssetName.desc ? <AiFillCaretDown /> : <AiFillCaretUp />}
            </th>
            <th onClick={(e) => { handleClickSort("AssignedTo", e) }}>Assigned to
              {optionSort.AssignedTo.desc ? <AiFillCaretDown /> : <AiFillCaretUp />}
            </th>
            <th onClick={(e) => { handleClickSort("AssignedBy", e) }}>Assigned by
              {optionSort.AssignedBy.desc ? <AiFillCaretDown /> : <AiFillCaretUp />}
            </th>
            <th onClick={(e) => { handleClickSort("AssignedDate", e) }}>Assigned date
              {optionSort.AssignedDate.desc ? <AiFillCaretDown /> : <AiFillCaretUp />}
            </th>
            <th className='scale-col-12' onClick={(e) => { handleClickSort("State", e) }}>State
              {optionSort.State.desc ? <AiFillCaretDown /> : <AiFillCaretUp />}
            </th>
            <th className="header_tools"></th>
          </tr>
        </thead>
        <tbody>
          {paging.totalItems > 0 ? props.children :
            <span style={{ width: '200px', display: 'block', margin: '0 auto' }} className="rowNotify"> No assets are found! </span>}
        </tbody>
      </Table>
      <AssignmentPagination
        paging={paging}
      />
    </div>
  )
}

export default Home
