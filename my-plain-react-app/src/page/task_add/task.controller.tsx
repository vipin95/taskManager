import TaskAdd from "./task_add.tsx";
import { useState } from 'react';
import { useNavigate } from 'react-router';
import {Post} from "../../service/getRequest.tsx";

function TaskAddController() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});
    // useEffect(() => {
    //   }, []);
    const updateState = (obj)=>{
        setFormData({...formData,  ...obj});
    }
    const postData = async ()=>{
        const APIresponse = await Post("/task", formData);
        navigate("/list")
    }
    return(
        <TaskAdd formData={formData} updateState={updateState} postData={postData}/>
    )
}
export default TaskAddController;