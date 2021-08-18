import React from 'react'
import { Table } from 'reactstrap';
import { BsCheck } from "@react-icons/all-files/bs/BsCheck";
import { IoCloseSharp } from "@react-icons/all-files/io5/IoCloseSharp";
import { MdSettingsBackupRestore } from "@react-icons/all-files/md/MdSettingsBackupRestore"

function Home() {
  return (
    <div className="home">
      <h5 className="right-title">My Assignment</h5>
      <Table>
        <thead>
          <tr>
            <th>Asset Code</th>
            <th>Asset Name</th>
            <th>Category</th>
            <th>Assigned Date</th>
            <th>State</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>@mdo</td>
            <td>
              <span className='icon-nash icon-nash--red'>

                <IoCloseSharp />
              </span>
              <span className='icon-nash icon-nash--black'>

                <BsCheck />
              </span>
              <span className='icon-nash icon-nash--blue'>
                <MdSettingsBackupRestore />
              </span>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}

export default Home
