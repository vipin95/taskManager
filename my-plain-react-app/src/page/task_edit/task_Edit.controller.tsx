import TaskEdit from "./task_Edit.tsx";
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router";
import {Get, Edit} from "../../service/getRequest.tsx";

function TaskAddController() {
    const [formData, setFormData] = useState({});
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        Get("/task", location.state.id)
          .then((response) => {
            updateState(response[0]);
          })
          .catch((error) => console.error("Error in fetching users:", error));
      }, []);
    const updateState = (obj)=>{
        setFormData({...formData, ...obj});
    }
    const UpdateData = async ()=>{
        let payload = {
            "name": formData?.name,
            "description": formData?.description,
            "id" : location.state.id,
            "status": formData?.status
        }
        const APIresponse = await Edit("/task", payload);
        navigate("/list");
        
    }
    return(
        <TaskEdit formData={formData} updateState={updateState} UpdateData={UpdateData}/>
    )
}
export default TaskAddController;