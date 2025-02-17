import { useState, useEffect } from "react";
import { easyDev } from "../Api/Api.js";
import TaskComp from "../Components/TaskComp.jsx";
import TaskAdd from "../Components/TaskAdd.jsx";
import ChangeTask from "../Components/ChangeTask.jsx";

function App() {
  let [allTodo, setAllTodo] = useState([]);
  const[choiceTodoList, setChoiceTodoList] = useState('all')


  
  async function connectToStatus(status) {
    setChoiceTodoList(status)
    let apiConnect = await easyDev(status);
    let data = apiConnect.data.map((item) => ({
      id: item.id,
      name: item.title,
      checked: item.isDone,
    }));
    setAllTodo(data)
    
  }

  useEffect(() => {
    const reloadTodoList= async () => await connectToStatus(choiceTodoList)
    const interval = setInterval(reloadTodoList, 4000);
    return () => clearInterval(interval);
  }, [choiceTodoList]);

  return (
    <>
      <button onClick={()=>connectToStatus('all')}>Все</button>
      <button onClick={()=>connectToStatus('inWork')}>В работе</button>
      <button onClick={()=>connectToStatus('completed')}>Завершены</button>
      <TaskComp task={allTodo} connect={connectToStatus}  />
    </>
  );
}

export default App;
