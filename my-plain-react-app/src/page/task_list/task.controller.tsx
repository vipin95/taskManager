import TaskList from "./task_list.tsx";
import { useEffect, useState } from 'react';
import {Get} from "../../service/getRequest.tsx";

function TaskController() {
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        Get("http://127.0.0.1:4000/task")
          .then((response) => response.json())
          .then((data) => setTasks(data))
          .catch((error) => console.error("Error fetching users:", error));
      }, []);
    return(
        <TaskList tasks={tasks}/>
    )
}
export default TaskController;