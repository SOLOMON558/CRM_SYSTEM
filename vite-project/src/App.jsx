import { useState, useEffect} from "react";
import { easyDev, easyDevPost, easyDevPut, easyDevEdit, easyDevDelete } from "./Api.js";
import TaskComp from "./TaskComp.jsx";
import TaskAdd from "./AddTask.jsx";
import ChangeTask from "./ChangeList.jsx";




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
  let interval = setInterval(Connect,1000)
  return () => clearInterval(interval)
},[])


//ДОБАВЛЕНИЕ НОВОЙ ЗАДАЧИ ?????

async function  clickAddTask(value) {
  if ((value.length>2)&&(value.length<64)){
  let data = {isDone: false, title:value}
  await easyDevPost(data)
  setNewTask('')
  setPlaceHolder("Введите задачу")
  await Connect();
  
}else if (value.length>64){
  setNewTask('')
  setPlaceHolder("Не более 64 символов!")
}
else if (value.length<2) {
  setPlaceHolder("Не менее 2 символов!")
  setNewTask('')
}} 
//НАЖАТИЕ НА ЧЕКБОКС/ВЫПОЛНЕНИЕ ЗАДАЧИ/ОШИБОЧНЫЙ КЛИК
async function checkboxChange (number,bool) {
    await easyDevPut(number,bool)
    await Connect();
}
// EDIT
function editClick (number) {
  setEdit(number)
}

async function editTaskClick(value,number) {
  await easyDevEdit(number,value)
  await Connect ()
  setEdit(null)
  setEditTask('')
}
//CANCEL
function cancelClick() {
  setEdit(null)
}
// DELETE
async function deleteClick (number) {
    await easyDevDelete(number)
    await Connect()
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
      <TaskAdd placeHolder={placeHolder} newTask={newTask} setNewTask={setNewTask} clickAddTask={clickAddTask}/>
      <div>
        <ChangeTask activeTask={activeAll} taskClick={allClick} tasks={allTodo}/>
        <ChangeTask activeTask={activeWork} taskClick={workClick} tasks={inWork}/>
        <ChangeTask activeTask={activeFinish} taskClick={finishClick} tasks={finishTodo}/>
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