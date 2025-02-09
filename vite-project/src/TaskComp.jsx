
import TodoItem from "./TodoItem"
export default function TaskComp ({task, edit, checkboxChange,
     editClick, deleteClick,editTaskClick,activeTask,cancelClick, editTask,setEditTask}){
return (<span >
          <ul className={activeTask}>
            {task.map((item,index)=>(
              <TodoItem key={index} item={item} edit={edit} checkboxChange={checkboxChange} 
              editClick={editClick} deleteClick={deleteClick} editTaskClick={editTaskClick}
              cancelClick={cancelClick} editTask={editTask} setEditTask={setEditTask}
              />
              ))}
          </ul>
        </span>
)}