import TaskList from "./task_list.tsx";
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router";
import { Get, Edit, Delete } from "../../service/getRequest.tsx";
import { API_PATHS } from "../../assets/constants.js";
import { toast } from 'react-toastify';

function TaskController() {
  const [tasks, setTasks] = useState([]);
  const [selectedList, setSelectedList] = useState("All");
  const navigate = useNavigate();
  useEffect(() => {
    try {
      getList();
    } catch (error) {
      toast.error(error.message);
    }
  }, []);
  const getList = () => {
    Get(API_PATHS.TASKS)
      .then((response) => {
        setTasks(response)
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }
  const updateState = async (obj) => {
    try {
      await Edit(API_PATHS.TASKS, obj);
      // TODO: need to catch and throw error
      getList();
    } catch (error) {
      toast.error(error.message);
    }
  }
  const deleteItem = async (id) => {
    try {
      await Delete(`${API_PATHS.TASKS}/${id}`);
      // TODO: need to catch and throw error
      getList();
    } catch (error) {
      toast.error(error.message);
    }
  }
  const logout = async () => {
    try {
      const APIresponse = await Delete(API_PATHS.AUTH);
      if(APIresponse == "Cookie deleted"){
        localStorage.setItem("login", "false");
        navigate(`${API_PATHS.LOGIN}`);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <TaskList selectedList={selectedList} setSelectedList={setSelectedList} tasks={tasks} deleteItem={deleteItem} updateState={updateState} navigate={navigate} logout={logout} />
  )
}
export default TaskController;