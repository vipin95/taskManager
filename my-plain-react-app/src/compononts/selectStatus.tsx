import style from "../assets/style/addTask_style.module.css";

function SelectStatus({id, status, updateState=({})=>{alert("Default")}}) {
    return (
        <select value={status} name="taskStatus" id="taskStatus" onChange={(event) => { updateState({ "id":id, "status": event.target.value }) }} className={style.taskStatus}>
            <option value="todo">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="delayed">Delayed</option>
            <option value="cancelled">Cancelled</option>
            <option value="completed">Completed</option>
        </select>
    )
}
export default SelectStatus;