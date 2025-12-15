import style from "../../assets/style/addTask_style.module.css";
import { useNavigate } from "react-router";

function TaskAdd({formData, updateState, postData, date, inputRef}) {
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
                <h1>Create New Task</h1>
                <p>Add a new work ticket to track your tasks and manage you workflow</p>
            </header>
            <div className={style.sub_container}>
                <div className={style.form_header}>
                    <h4>Task details</h4>
                    <p>Fill in the information below to create a new task ticket</p>
                </div>
                <form onSubmit={(e)=>postData(e)}>
                    <label for="title" ref={inputRef} >Task Title <span>*</span></label><br />
                    <input type="text" onChange={(event)=>{updateState({...formData,"name":event.target.value})}} name="title" className={style.title} id="title" placeholder="e.g., Fix login authenticaiton bug"/><br />
                    <label for="description">Description</label><br />
                    <textarea name="" onChange={(event)=>{updateState({...formData,"description":event.target.value})}} className={style.description} id="description" cols="30"
                            placeholder="Provide detailed information about the task..."></textarea><br />
                    <label for="taskStatus">Status</label><br />
                    <select name="taskStatus" id="taskStatus" className={style.taskStatus} disabled>
                        <option value="To Do">To Do</option>
                    </select>
                    <hr/>
                    <label for="preview">Preview</label>
                    <div className={style.card} id="preview">
                        <div className={style.card_left}>
                            <span className={style.taskStage} style={{"background-color": "#dbfce7", "color":"#248236"}}>Completed</span>
                            <p>{formData?.name}</p>
                            <p className={style.taskDescription}>{formData?.description}</p>
                            <ul className={style.taskDates}>
                                <li>{date}</li>
                                <li>{date}</li>
                            </ul>
                        </div>
                    </div>
                    <div className={style.form_button}>
                        <button type="button" className={style.cancel}>Reset</button>
                        <button type="submit">+ Create Task</button>

                        {/* <input type="button" value="+ Create Task"/> */}
                    </div>
                </form>
            </div>
        </div>
        </div>
    )
}

export default TaskAdd;