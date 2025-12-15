import style from '../../assets/style/task_list.module.css';
import TaskCard from "../../compononts/task_card.tsx";

function DefaultPage({deleteItem, tasks, updateState, navigate, logout, setSelectedList, selectedList}){
    return(
        <div className={style.container}>
            <div className={style.sub_container}>
                <div className={style.pageTitle}>
                    <div className={style.pageTitle_left}>
                        <h1 className={style.pageHeading}>Task Manager</h1>
                        <p className={style.pageSubHeading}>Track and manage your work tasks efficiently</p>
                    </div>
                    <div className={style.pageTitle_right}>
                        <button onClick={()=> navigate("/add")}>
                            <span>+</span>Create task</button>
                        <button onClick={()=> logout()}>
                        <span>⎋</span>Logout</button>
                    </div>
                </div>
                <nav className={style.taskfilter}>
                    <ul className={style.filterUl}>
                        {
                            tasks[0]?.map(({status, count}, index) => {
                                if( index == 0 ){
                                    return  <>
                                        <li onClick={() => setSelectedList("All")} className={`${style.filterLi} ${ selectedList === "All"?style.active:""}`}>All ({tasks[1].length})</li>
                                        <li onClick={() => setSelectedList(status)} className={`${style.filterLi} ${ selectedList === status ? style.active:""}`} key={index}>{status==="in_progress" ? "in progress" : status} ({count})</li>
                                    </>
                                }else {
                                    return <li onClick={() => setSelectedList(status)} className={`${style.filterLi} ${ selectedList === status ? style.active:""}`} key={index}>{status==="in_progress" ? "in progress" : status} ({count})</li>
                                }
                                
                            })
                        }
                    </ul>
                </nav>
                <div className={style.tasks}>
                    {
                        tasks[1]?.map((task)=>{
                            if(selectedList === "All"){
                                return <TaskCard deleteItem={deleteItem} navigate={navigate} data={task} style={style} updateState={updateState}/>
                            }else if(task.status === selectedList){
                                return <TaskCard deleteItem={deleteItem} navigate={navigate} data={task} style={style} updateState={updateState}/>
                            }
                        })
                    }
                </div>
            </div>   
        </div>
    )
}
export default DefaultPage;