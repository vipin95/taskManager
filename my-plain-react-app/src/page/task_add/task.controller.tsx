import TaskAdd from "./task_add.tsx";
import { useEffect, useState } from 'react';
import {Post} from "../../service/getRequest.tsx";

function TaskAddController() {
    const [formData, setFormData] = useState({});
    // useEffect(() => {
    //   }, []);
    const updateState = (obj)=>{
        setFormData({...formData,  ...obj});
    }
    const postData = async ()=>{
        const APIresponse = await Post("http://127.0.0.1:4000/task", formData);
        console.log(APIresponse.status);
    }
    return(
        <TaskAdd formData={formData} updateState={updateState} postData={postData}/>
    )
}
export default TaskAddController;