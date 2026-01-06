function PreviewCard({style, formData, date}) {
    return(
        <>
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
        </>
    )
}
export default PreviewCard;