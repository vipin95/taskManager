import TaskList from "./task_list.tsx";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import { Get, Edit, Delete } from "../../service/getRequest.tsx";

function TaskController() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getList();
  }, []);
  const getList = () => {
    Get("/task")
      .then((response) => {
        setTasks(response)
      })
      .catch((error) => console.error("Error fetching users:", error));
  }
  const updateState = async (obj) => {
    const APIresponse = await Edit("/task", obj);
    console.log(APIresponse);
    getList();
  }
  const deleteItem = async (id) => {
    const APIresponse = await Delete("/task/"+id);
    console.log(APIresponse);
    getList();
  }
  return (
    <TaskList tasks={tasks} deleteItem={deleteItem} updateState={updateState} navigate={navigate} />
  )
}
export default TaskController;