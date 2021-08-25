import React from "react";

function ReportItem(props) {
  let { report } = props;
  console.log(report);
  return (
    <tr>
      <td>{report.categoryName}</td>
      <td>{report.total}</td>
      <td>{report.assigned}</td>
      <td>{report.available}</td>
      <td>{report.notAvailable}</td>
      <td>{report.waitingForRecycling}</td>
      <td>{report.recycled}</td>
    </tr>
  );
}

export default ReportItem;
