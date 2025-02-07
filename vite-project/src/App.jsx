import { useState, useEffect} from "react";
import { easyDev } from "./Api.js";
import TaskComp from "./TaskComp.jsx";




function App() {

  let [newTask, setNewTask] = useState('');
  let [placeHolder, setPlaceHolder] = useState('Введите задачу');
  let [allTodo, setAllTodo] = useState([])
  let [finishTodo, setFinishTodo] = useState([])
  let [inWork, setInWork] = useState([])
  let [edit, setEdit] = useState()
  let [editTask, setEditTask] = useState('')
  let [activeAll,setActiveAll] = useState('active')
  let [activeWork,setActiveWork] = useState('invis')
  let [activeFinish,setActiveFinish] = useState('invis')




  

//ПОДКЛЮЧЕНИЕ И ВЫВОД БЭКЭНДА
async function Connect() {
  let apiConnect = await easyDev();
  let data= apiConnect.data.map((item) => ({id:item.id, name:item.title, checked:item.isDone}))
    setAllTodo(data)
    setInWork(data.filter((item)=>(item.checked!==true)))
    setFinishTodo(data.filter((item)=>(item.checked!==false)))
}

useEffect(()=> {
  Connect();
  let interval = setInterval(Connect,4000)
  return () => clearInterval(interval)
},[])


//ДОБАВЛЕНИЕ НОВОЙ ЗАДАЧИ ?????

async function  clickAddTask(value) {
  if ((value!='')&&(value.length<26)){
    let data = {isDone: false, title:value}
   await  fetch('https://easydev.club/api/v2/todos', {
      method: 'POST', 
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data) 
    })
  setNewTask('')
  setPlaceHolder("Введите задачу")
  await Connect();
  
}else if (value.length>26){
  setNewTask('')
  setPlaceHolder("Не более 26 символов")
}
else if (value==='') {
  setPlaceHolder("Пустая строка!")
  setNewTask('')
}
} 


 

//НАЖАТИЕ НА ЧЕКБОКС/ВЫПОЛНЕНИЕ ЗАДАЧИ/ОШИБОЧНЫЙ КЛИК
async function checkboxChange (number,bool) {
  await fetch(`https://easydev.club/api/v2/todos/${number}`, 
    { method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isDone:!bool }),
    })
    await Connect();


  
}
// EDIT
function editClick (number) {
  setEdit(number)
}



async function editTaskClick(value,number) {

  await fetch(`https://easydev.club/api/v2/todos/${number}`, 
  { method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: value }),
  })
  setAllTodo(allTodo.map((item)=>(item.id===number? {...item, name:value}: item)))
  setInWork(inWork.map((item)=>(item.id===number? {...item, name:value}: item)))
  setFinishTodo(finishTodo.map((item)=>(item.id===number? {...item, name:value}: item)))
  setEdit(null)
  setEditTask('')
}
//CANCEL
function cancelClick() {
  setEdit(null)
}
// DELETE
async function deleteClick (number) {
  await fetch(`https://easydev.club/api/v2/todos/${number}`, 
    { method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(),
    })
    setAllTodo(allTodo.filter((item)=>(item.id!==number)))
    setInWork(inWork.filter((item)=>(item.id!==number)))
    setFinishTodo(finishTodo.filter((item)=>(item.id!==number)))
}
function allClick() {
  setActiveAll("active")
  setActiveWork("invis")
  setActiveFinish("invis")
}
function workClick(){
  setActiveAll("invis")
  setActiveWork("active")
  setActiveFinish("invis")
}
function finishClick() {
  setActiveAll("invis")
  setActiveWork("invis")
  setActiveFinish("active")
}


  return (
    <body>
      <div >
      <input className="divAdd" id="placeholder" type="text" placeholder={placeHolder} value={newTask}
         onChange={(event)=>setNewTask(event.target.value)} />
      <button className="buttonInput" onClick={()=>clickAddTask(newTask)}>Add</button>
      </div>
      <div>
        <button className={`buttonTask ${activeAll==='active'? 'activeButt': ''}`} onClick={allClick}>ВСЕ({allTodo.length})</button>
        <button className={`buttonTask ${activeWork==='active'? 'activeButt': ''}`}  onClick={workClick}>В РАБОТЕ({inWork.length})</button>
        <button className={`buttonTask ${activeFinish==='active'? 'activeButt': ''}`} onClick={finishClick}>СДЕЛАНЫ({finishTodo.length})</button>
        <TaskComp task={allTodo} edit={edit} checkboxChange={checkboxChange} editClick={editClick} deleteClick={deleteClick}
        editTaskClick={editTaskClick} activeTask={activeAll} cancelClick={cancelClick} editTask={editTask} setEditTask={setEditTask}/>
        <TaskComp task={inWork} edit={edit} checkboxChange={checkboxChange} editClick={editClick} deleteClick={deleteClick}
        editTaskClick={editTaskClick} activeTask={activeWork} cancelClick={cancelClick} editTask={editTask} setEditTask={setEditTask}/>
        <TaskComp task={finishTodo} edit={edit} checkboxChange={checkboxChange} editClick={editClick} deleteClick={deleteClick}
        editTaskClick={editTaskClick} activeTask={activeFinish} cancelClick={cancelClick} editTask={editTask} setEditTask={setEditTask}/>
      </div>
    </body>
  );
}

export default App;