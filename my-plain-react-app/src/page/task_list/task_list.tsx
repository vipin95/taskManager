import style from '../../assets/style/task_list.module.css';
import { useNavigate } from 'react-router';
import TaskCard from "../../compononts/task_card.tsx";
import { useEffect, useState } from 'react';

function DefaultPage(){
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        fetch("http://127.0.0.1:4000/task")
          .then((response) => response.json())
          .then((data) => setTasks(data))
          .catch((error) => console.error("Error fetching users:", error));
      }, []);
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
                {/* <span className="taskStage"  style={{"background-color": "#e2e8f0", "color":"#3a4a60"}} >To Do</span>
                <span className="taskStage" style={{"background-color": "#dbfce7", "color":"#248236"}} >Completed</span> */}
                    {
                        tasks?.map((task)=>{
                           return <TaskCard data={task} style={style}/>
                        })
                    }
                </div>
            </div>   
        </div>
    )
}
export default DefaultPage;