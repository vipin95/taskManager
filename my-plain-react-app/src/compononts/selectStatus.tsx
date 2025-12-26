function SelectStatus({style, status, updateState, id}) {
    return (
        <select value={status} name="taskStatus" id="taskStatus" onChange={(event) => { updateState({"status": event.target.value, "id" : id }) }} className={style.taskStatus}>
            <option value="todo">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="delayed">Delayed</option>
            <option value="cancelled">Cancelled</option>
            <option value="completed">Completed</option>
        </select>
    )
}
export default SelectStatus;