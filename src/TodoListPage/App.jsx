import { useState, useEffect } from "react";
import { getTasks } from "../Api/Api.js";
import TodoList from "../Components/TodoList.jsx";
import AddTask from "../Components/AddTask.jsx";
import TabsList from "../Components/TabsList.jsx";

function App() {
  const [allTodo, setAllTodo] = useState([]);
  const [choiceTodoList, setChoiceTodoList] = useState("all");
  const [countTasks, setCountTasks] = useState([0, 0, 0]);

  async function connectToStatus(status) {
    setChoiceTodoList(status);
    const apiConnect = await getTasks(status);
    const data = apiConnect.data.map((item) => ({
      id: item.id,
      name: item.title,
      checked: item.isDone,
    }));
    setCountTasks([
      apiConnect.info.all,
      apiConnect.info.inWork,
      apiConnect.info.completed,
    ]);
    setAllTodo(data);
  }

  useEffect(() => {
    const reloadTodoList = async () => await connectToStatus(choiceTodoList);
    reloadTodoList();
    const interval = setInterval(reloadTodoList, 4000);
    return () => clearInterval(interval);
  }, [choiceTodoList]);

  return (
    <>
      <AddTask connectToStatus={connectToStatus} status={choiceTodoList} />
      <TabsList
        connectToStatus={connectToStatus}
        status={choiceTodoList}
        countTasks={countTasks}
      />
      <TodoList
        task={allTodo}
        connectToStatus={connectToStatus}
        status={choiceTodoList}
      />
    </>
  );
}

export default App;
