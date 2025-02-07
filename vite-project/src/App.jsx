import { useState, useEffect} from "react";
import { easyDev } from "./Api.js";
import korzina from "./assets/korzina.png"
import editpng from "./assets/edit.png"



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
  if (value!=''){
    let data = {isDone: false, title:value}
   await  fetch('https://easydev.club/api/v2/todos', {
      method: 'POST', 
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data) 
    })
  setNewTask('')
  setPlaceHolder("Введите задачу")
  await Connect();
  
}else {
  setPlaceHolder("Пустая строка!!!")
}} 


 

//НАЖАТИЕ НА ЧЕКБОКС/ВЫПОЛНЕНИЕ ЗАДАЧИ/ОШИБОЧНЫЙ КЛИК
async function checkboxChange (number) {
  await fetch(`https://easydev.club/api/v2/todos/${number}`, 
    { method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isDone:true }),
    })


  setAllTodo(allTodo.map((item)=>(item.id===number ? {...item, checked :true}: item)))
  if (!finishTodo.some((item) => item.id === number)) {
  setFinishTodo([...finishTodo, allTodo.find((item)=>(item.id===number))]) }
  setInWork(inWork.filter((item)=>(item.id!==number)))
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
        <span ><ul className={activeAll}>
            
            {allTodo.map((item,index)=>(
              <>
              <li className="liTask" key={index}>
                { edit!==item.id ?  (<><input  type="checkbox" checked={item.checked ? "checked": ''}
                   disabled={item.checked} onChange={()=>checkboxChange(item.id)}/><span className="task">{item.name}</span>
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
                </li>
              </>
              ))}
          </ul>
        </span>
        <span  >
        <ul className={activeWork}>
          {inWork.map((item,index)=>(
            <li className="liTask" key={index}>
              { edit!==item.id ?  (<><input type="checkbox"  onChange={()=>checkboxChange(item.id)}/>
              <span className="task">{item.name}</span>
              <button className="bDelete" onClick={()=>editClick(item.id)}><img className="delete" src={editpng}/></button>
              <button className="bDelete" onClick={()=>deleteClick(item.id)}><img className="delete" src={korzina}/></button></>): (<>
              <input type="text" value={editTask} onChange={(event)=>setEditTask(event.target.value)}/>
         <button onClick={()=>editTaskClick(editTask,item.id)}>
          Save
          </button>
          <button  onClick={cancelClick}>
            Отмена
            </button></>)}   
            </li>
          ))}
        </ul>   
        </span>
        <span >
        <ul className={activeFinish}>
          {finishTodo.map((item)=>(
            <li className="liTask" key={item.id}>{ edit!==item.id ?  (<><input  type="checkbox" checked="checked"
              disabled={item.checked} /><span className="task">{item.name}</span>
             <button className="bDelete" onClick={()=>editClick(item.id)}><img className="delete" src={editpng}/></button>
             <button className="bDelete" onClick={()=>deleteClick(item.id)}><img className="delete" src={korzina}/></button></>): (<>
             <input type="text" value={editTask} onChange={(event)=>setEditTask(event.target.value)}/>
             <button onClick={()=>editTaskClick(editTask,item.id)}>
               Save
               </button>
               <button onClick={cancelClick}>
                 Отмена
                 </button>
                 </>)}</li>
          ))}
        </ul>
        </span>
      </div>
      <div>  
      </div>

    </body>
  );
}

export default App;