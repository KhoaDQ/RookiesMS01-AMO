import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { RETURN_REQUEST } from "../../../actions/ManagerRequest/ActionType";
import callApi from "../../../apis/callApi";
import PopupReturnRequest from "../../../components/Popup/PopupReturnRequest";

export default function CreateRequest(userID, requestBy) {

  const initRequest ={
    AssignmentID: 0,
    UserID: 0,
    RequestedBy: "",
  }
  const [request,setRequest] = useState(initRequest);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assignment, setAssignment] = useState({});

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

  const handleRequestOpen = (assignment) =>{
    setIsModalOpen(true);
    setAssignment(assignment)
  }
  const handleRequest = () =>{
    if(assignment!==undefined){
        if(assignment.state === "Accepted" && userID!=undefined){
          setRequest({
            ...request,
            AssignmentID: assignment.id,
            UserID: userID,
            RequestedBy: requestBy,
          });
          setIsModalOpen(false);
        }
      }
  }

  function showPopupRequest(){
    return(
        <PopupReturnRequest
            handleRequest = {handleRequest}
            isModalOpen = {isModalOpen}
        />
    )
  }
  return ({handleRequestOpen,showPopupRequest});
}