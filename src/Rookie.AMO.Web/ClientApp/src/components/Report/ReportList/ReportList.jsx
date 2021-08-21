import {
  Col,
  Row,
  Table,
  Button,
  InputGroupText,
  FormGroup,
  InputGroupAddon,
  Input,
  InputGroup,
} from "reactstrap";
import { Fragment } from "react";
import React from "react";
import "../../Asset/style.css";
import handleExport from "../../../pages/Report/index";
function ReportList(props) {
  //let { handleExport } = props;
  const listArray = [
    "Category",
    "Total",
    "Assigned",
    "Available",
    "Not Available",
    "Waiting for recycling",
    "Recycled",
  ];
  const listReport = listArray.map((item, index) => {
    return <th key={index}>{item}</th>;
  });
  return (
    <Fragment>
      <h5 className="right-title">Report</h5>
      <Row from className="text-right right-bar">
        <Col md={12}>
          <Button type="button" color="danger" onClick={props.handleExport}>
            Export
          </Button>
        </Col>
      </Row>
      <Table className="table_border_spacing">
        <thead>
          <tr>{listReport}</tr>
        </thead>
        <tbody>{props.children}</tbody>
      </Table>
    </Fragment>
  );
}

export default ReportList;
