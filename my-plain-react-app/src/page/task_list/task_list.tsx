import style from '../../assets/style/task_list.module.css';
import TaskCard from "../../compononts/task_card.tsx";

function DefaultPage({deleteItem, tasks, updateState, navigate, logout}){
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
                                if(index == 0 ){
                                    return  <>
                                        <li className={`${style.filterLi} ${style.active}`}>All ({tasks[1].length})</li>
                                        <li className={style.filterLi} key={index}>{status} ({count})</li>
                                    </>
                                }else {
                                    return <li className={style.filterLi} key={index}>{status} ({count})</li>
                                }
                                
                            })
                        }
                        
                        {/* <li className={style.filterLi}>To Do (1)</li> */}
                        {/* <li className={style.filterLi}>In Progress (1)</li> */}
                        {/* <li className={style.filterLi}>Completed (1)</li> */}
                        {/* <li className={style.filterLi}>Delayed (0)</li> */}
                        {/* <li className={style.filterLi}>Failed (0)</li> */}
                    </ul>
                </nav>
                <div className={style.tasks}>
                    {
                        tasks[1]?.map((task)=>{
                           return <TaskCard deleteItem={deleteItem} navigate={navigate} data={task} style={style} updateState={updateState}/>
                        })
                    }
                </div>
            </div>   
        </div>
    )
}
export default DefaultPage;