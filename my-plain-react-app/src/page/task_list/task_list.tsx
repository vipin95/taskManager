import style from '../../assets/style/task_list.module.css';
// import { useNavigate } from 'react-router';
import TaskCard from "../../compononts/task_card.tsx";

function DefaultPage({deleteItem, tasks, updateState, navigate}){
    // const navigate = useNavigate();
    
    return(
        <div className={style.container}>
            <div className={style.sub_container}>
                <div className={style.pageTitle}>
                    <div className={style.pageTitle_left}>
                        <h1 className={style.pageHeading}>Task Manager</h1>
                        <p className={style.pageSubHeading}>Track and manage your work tasks efficiently</p>
                    </div>
                    <div className={style.pageTitle_right}>
                        
                        <button onClick={()=> navigate("/add")} type={style.button}>
                            <span>+</span>Create task</button>
                    </div>
                </div>
                <nav className={style.taskfilter}>
                    <ul className={style.filterUl}>
                        <li className={`${style.filterLi} ${style.active}`}>All (4)</li>
                        <li className={style.filterLi}>To Do (1)</li>
                        <li className={style.filterLi}>In Progress (1)</li>
                        <li className={style.filterLi}>Completed (1)</li>
                        <li className={style.filterLi}>Delayed (0)</li>
                        <li className={style.filterLi}>Failed (0)</li>
                    </ul>
                </nav>
                <div className={style.tasks}>
                    {
                        tasks?.map((task)=>{
                           return <TaskCard deleteItem={deleteItem} navigate={navigate} data={task} style={style} updateState={updateState}/>
                        })
                    }
                </div>
            </div>   
        </div>
    )
}
export default DefaultPage;