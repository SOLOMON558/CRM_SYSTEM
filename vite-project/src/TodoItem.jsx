import korzina from "./assets/korzina.png"
import editpng from "./assets/edit.png"
export default function TodoItem ({item, edit, checkboxChange,
    editClick, deleteClick,editTaskClick,cancelClick, editTask,setEditTask})
{return (
              <li className="liTask">
                { edit!==item.id ?  (<><input  type="checkbox" checked={item.checked ? "checked": ''}
                    onChange={()=>checkboxChange(item.id, item.checked)}/><span className="task">{item.name}</span>
                  <button className="bDelete" onClick={()=>editClick(item.id)}><img className="delete" src={editpng}/></button>
                  <button className="bDelete" onClick={()=>deleteClick(item.id)}><img className="delete" src={korzina}/></button></>): (<>
                  <input type="text" value={editTask} onChange={(event)=>setEditTask(event.target.value)}/>
                  <button onClick={()=>editTaskClick(editTask,item.id)}>
                    Save
                    </button>
                    <button onClick={cancelClick}>
                      Отмена
                      </button>
                      </>)}  
                </li>) }
             