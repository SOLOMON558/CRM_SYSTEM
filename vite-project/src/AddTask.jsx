export default function TaskAdd({placeHolder, newTask, setNewTask, clickAddTask}){
return (
<div >
      <input className="divAdd" id="placeholder" type="text" placeholder={placeHolder} value={newTask}
         onChange={(event)=>setNewTask(event.target.value)} />
      <button className="buttonInput" onClick={()=>clickAddTask(newTask)}>Add</button>
</div> )}