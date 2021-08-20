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
import "../../Asset/style.css";

function ReportList(props) {
  const listArray = [
    "Category",
    "Total",
    "Assigned",
    "Available",
    "Not Available",
    "Waiting for recycling",
    "Recycled",
  ];
  return (
    <Fragment>
      <h5 className="right-title">Report</h5>
      <Row from className="text-right right-bar">
        <Col md={12}>
          <Button color="danger">Export</Button>
        </Col>
      </Row>
      <Table className="table_border_spacing">
        <thead>
          <tr>
            {listArray.map((item, index) => (
              <th key={index}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>{props.children}</tbody>
      </Table>
    </Fragment>
  );
}

export default ReportList;
