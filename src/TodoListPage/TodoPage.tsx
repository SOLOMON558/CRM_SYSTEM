import { useState, useEffect } from "react";
import { getTasks } from "../api/Api";
import TodoList from "../components/TodoList";
import AddTask from "../components/AddTask";
import TabsList from "../components/TabsList";
import { StatusType, Todo, TodoInfo } from "../types/type";

export default function TodoPage() {
  const [allTodo, setAllTodo] = useState<Todo[]>([]);
  const [currentTodoList, setCurrentTodoList] = useState<StatusType>("all");
  const [countTasks, setCountTasks] = useState<TodoInfo>({
    all: 0,
    completed: 0,
    inWork: 0,
  });

  async function getAndUpdateTasks(status: StatusType): Promise<void> {
    setCurrentTodoList(status);
    const result = await getTasks(status);

    if (result.info) {
      setCountTasks({
        all: result.info.all,
        completed: result.info.completed,
        inWork: result.info.inWork,
      });
    }

    setAllTodo(result.data);
  }

  useEffect(() => {
    const reloadTodoList = async () => await getAndUpdateTasks(currentTodoList);
    reloadTodoList();
    const interval = setInterval(reloadTodoList, 4000);
    return () => clearInterval(interval);
  }, [currentTodoList]);

  return (
    <>
      <AddTask getAndUpdateTasks={() => getAndUpdateTasks(currentTodoList)} />
      <TabsList
        getAndUpdateTasks={getAndUpdateTasks}
        status={currentTodoList}
        countTasks={countTasks}
      />
      <TodoList
        allTodo={allTodo}
        getAndUpdateTasks={() => getAndUpdateTasks(currentTodoList)}
      />
    </>
  );
}
