import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import apiCaller from "../../apis/callApi";
import ReportReducer from "../../reducers/reports/ReportReducer";
import ReportList from "../../components/Report/ReportList/ReportList";
import ReportItem from "../../components/Report/ReportItem/ReportItem";
import * as action from "../../actions/Report/ReportAction";
function Report() {
  const initialReport = {};

  const [report, setReport] = useState(initialReport);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchReport() {
      const res = await apiCaller("ReportViewer/report", "GET", null);
      console.log(res);
      dispatch({
        type: action.FETCH_REPORTS,
        payload: res.data,
      });
    }
    fetchReport();
    console.log();
  }, []);

  const reports = useSelector((state) => state.ReportReducer);

  function showReport(reports) {
    let result = null;
    if (reports != null) {
      if (reports.length > 0) {
        result = reports.map((report, index) => {
          return <ReportItem key={index} report={report} />;
        });
      }
    }
    return result;
  }
  return <ReportList>{showReport(reports)}</ReportList>;
}

export default Report;
