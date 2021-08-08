import React from "react";
import { Table } from "reactstrap";
import {
  Col,
  Row,
  Button,
  InputGroupText,
  FormGroup,
  InputGroupAddon,
  Input,
  InputGroup,
} from "reactstrap";
function Report() {
  return (
    <div>
      <h5 className="right-title">Report</h5>
      <Row from className='text-right'>
        <Col md={12}>
          <Button color="danger">Export</Button>
        </Col>
      </Row>
      <Table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Total</th>
            <th>Assigned</th>
            <th>Available</th>
            <th>Not Available</th>
            <th>Waiting for recycling</th>
            <th>Recycled</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Headset</td>
            <td>1500</td>
            <td>1200</td>
            <td>298</td>
            <td>2</td>
            <td>0</td>
            <td>0</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default Report;
