import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { RETURN_REQUEST } from "../../../actions/ManagerRequest/ActionType";
import callApi from "../../../apis/callApi";

export default function CreateRequest(userID, requestBy) {

  const initRequest ={
    AssignmentID: 0,
    UserID: 0,
    RequestedBy: "",
  }
  const [request,setRequest] = useState(initRequest);
  const dispatch = useDispatch();
  useEffect(() => {
    async function returnRequest(request) {
      const res = await callApi("Request", "POST", request);
  
      dispatch({ type: RETURN_REQUEST, payload: res.data });
    }

    let{AssignmentID, UserID, RequestedBy} = request;
    console.log(AssignmentID)
    if(AssignmentID!=="" && UserID!== "" && RequestedBy!== "")
      returnRequest(request).then((res)=>{console.log(res)})
  },[request])

  const handleRequest = (assignment) =>{
    if(assignment!==undefined){
      if(assignment.state === "Accepted" && userID!=undefined){
        setRequest({
          ...request,
          AssignmentID: assignment.id,
          UserID: userID,
          RequestedBy: requestBy,
        })
      }
    }
  }
  return handleRequest;
}