import TaskList from "./task_list.tsx";
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router";
import { Get, Edit, Delete } from "../../service/getRequest.tsx";
import { API_PATHS, stateName } from "../../assets/constants.js";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import { taskList } from "./redux/saveApiData.ts";

function TaskController() {
  const [selectedList, setSelectedList] = useState("All");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state?.[stateName.taskList]?.data)
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
        dispatch(taskList(response));
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
      let isConfirmed = window.confirm("Sure, want to delete the task?")
      if(isConfirmed){
        await Delete(`${API_PATHS.TASKS}/${id}`);
        // TODO: need to catch and throw error
        getList();
        toast.success("Deleted Successfully!");
      }
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