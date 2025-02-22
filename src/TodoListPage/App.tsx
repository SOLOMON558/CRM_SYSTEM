import { useState, useEffect } from "react";
import { getTasks } from "../Api/Api";
import TodoList from "../Components/TodoList";
import AddTask from "../Components/AddTask";
import TabsList from "../Components/TabsList";
export interface AllTodoTypes {
  id: number,
  title: string,
  isDone: boolean
}


function App(): JSX.Element {
  const [allTodo, setAllTodo] = useState<AllTodoTypes[]>([]);
  const [choiceTodoList, setChoiceTodoList] = useState("all");
  const [countTasks, setCountTasks] = useState([0, 0, 0]);

  async function connectToStatus(status:string): Promise<void> {
    setChoiceTodoList(status);
    const apiConnect = await getTasks(status);
    setCountTasks([
      apiConnect.info.all,
      apiConnect.info.inWork,
      apiConnect.info.completed,
    ]);
    setAllTodo(apiConnect.data);
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
