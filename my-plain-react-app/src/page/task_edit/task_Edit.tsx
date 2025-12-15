import style from "../../assets/style/addTask_style.module.css";
import { useNavigate } from "react-router";
import SelectStatus from "../../compononts/selectStatus.tsx";

function TaskEdit({formData, updateState, UpdateData, inputField}) {

    const navigate = useNavigate();

    return (
        <div className={style.body}>
            <div className={style.container}>
            <header className={style.pageHeader}>
                <div className={style.button}>
                    <button className={style.backButton} onClick={()=> navigate('/')}>
                        <span className={style.arrow}>←</span>
                        Back to Task list
                    </button>
                </div>
                <h1>Update Task</h1>
                <p>Edit work ticket</p>
            </header>
            <div className={style.sub_container}>
                <div className={style.form_header}>
                    <h4>Task details</h4>
                    <p>Fill in the information below to update task ticket</p>
                </div>
                <form onSubmit={(e)=>UpdateData(e)}>
                    <label for="title">Task Title</label><br />
                    <input ref={inputField} type="text" value={formData?.name} onChange={(event)=>{updateState({"name":event.target.value})}} 
                    name="title" className={style.title} id="title" placeholder="e.g., Fix login authenticaiton bug"/><br />
                    <label for="description">Description</label><br />
                    <textarea name="" value={formData?.description} onChange={(event)=>{updateState({"description":event.target.value})}} className={style.description} id="description" cols="30"
                            placeholder="Provide detailed information about the task..."></textarea><br />
                    <label for="taskStatus">Status</label><br />
                    <SelectStatus status={formData?.status} updateState={updateState} />
                    <div className={style.form_button}>
                        <button type="button" className={style.cancel}>Reset</button>
                        <button type="submit">Update Task</button>
                    </div>
                </form>
            </div>
        </div>
        </div>
    )
}

export default TaskEdit;