import TaskAdd from "./task_add.tsx";
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import {Post} from "../../service/request.tsx";
import { toast } from 'react-toastify';

function TaskAddController() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});
    const inputRef = useRef(null);
    useEffect(() => {
        inputRef.current.focus();
    },[])
    const updateState = (obj)=>{
        setFormData({...formData,  ...obj});
    }
    const postData = async (event)=>{
        try {
            event.preventDefault();
            await Post("/task", formData);
            // TODO: catch the error here
            navigate("/list");
            toast.success("Task added");
        } catch (error) {
            toast.error(error.message);
        }
    }
    let yourDate = new Date().toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric'});
    return(
        <TaskAdd inputRef={inputRef} formData={formData} updateState={updateState} date={yourDate} postData={postData}/>
    )
}
export default TaskAddController;