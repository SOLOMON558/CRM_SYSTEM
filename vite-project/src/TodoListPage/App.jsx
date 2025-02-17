import { useState, useEffect } from "react";
import { easyDev } from "../Api/Api.js";
import TaskComp from "../Components/TaskComp.jsx";
import TaskAdd from "../Components/TaskAdd.jsx";
import ChangeTask from "../Components/ChangeTask.jsx";

function App() {
  let [allTodo, setAllTodo] = useState([]);
  const[choiceTodoList, setChoiceTodoList] = useState('all')
  const[countTasks, setCountTasks] = useState([0,0,0])

  async function connectToStatus(status) {
    setChoiceTodoList(status)
    let apiConnect = await easyDev(status);
    let data = apiConnect.data.map((item) => ({
      id: item.id,
      name: item.title,
      checked: item.isDone,
    }));
    setCountTasks([apiConnect.info.all,apiConnect.info.inWork,apiConnect.info.completed])
    setAllTodo(data)
  }

  useEffect(() => {
    const reloadTodoList= async () => await connectToStatus(choiceTodoList)
    reloadTodoList();
    const interval = setInterval(reloadTodoList, 4000);
    return () => clearInterval(interval);
  }, [choiceTodoList]);

  return (
    <>
      <TaskAdd connect={connectToStatus} status={choiceTodoList} />
      <ChangeTask connectToStatus={connectToStatus} status={choiceTodoList} countTasks={countTasks} />
      <TaskComp task={allTodo}  connect={connectToStatus} status={choiceTodoList}/>
    </>
  );
}

export default App;
