function TaskCard({style, data: { name, description, created_at, updated_at, status }}) {
    return (
        <div className={style.card}>
            <div className={style.card_left}>
                <span className={style.taskStage}>In Progress</span>
                <p>{name}</p>
                <span className={style.taskDescription}>{description}</span><br />
                <ul className={style.taskDates}>
                    <li>Created: {created_at}</li>
                    <li>Updated: {updated_at}</li>
                </ul>
            </div>
            <div className={style.card_right}>
                <div className={style.kebab_icon} onclick="toggleMenu()">⋮</div>
            </div>
        </div>
    )
}
export default TaskCard;