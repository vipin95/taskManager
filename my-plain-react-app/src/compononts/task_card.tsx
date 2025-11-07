import SelectStatus from "./selectStatus.tsx";

function TaskCard({deleteItem, navigate, updateState, style, data: { name, description, created_at, updated_at, status, id } }) {
    return (
        <div className={style.card}>
            <div className={style.card_left}>
                <span className={`${style.taskStage} ${style[status]}`}>{status == "in_progress" ? "In Progress" : status}</span>
                <p>{name}</p>
                <span className={style.taskDescription}>{description}</span>
                <br />
                <br />
                <br />

                Status: <SelectStatus status={status} updateState={updateState} id={id} />

                <ul className={style.taskDates}>
                    <li>Created: {created_at}</li>
                    <li>Updated: {updated_at}</li>
                </ul>
            </div>
            <div className={style.card_right}>
                <div className={style.kebab_icon} onclick="toggleMenu()">
                    <span onClick={()=> navigate("/edit", { state: { id } })}>✏️</span>
                    <span onClick={()=> deleteItem(id)}> 🗑️</span></div>
            </div>
        </div>
    )
}
export default TaskCard;