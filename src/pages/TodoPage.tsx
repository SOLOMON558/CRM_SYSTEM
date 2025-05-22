import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../api/todos.js";
import TodoList from "../Components/TodoList.js";
import AddTask from "../Components/AddTask.js";
import TabsList from "../Components/TabsList.js";
import { Todo, TodoInfo } from "../types/todos.js";
import { setStatus } from "../store/Slice.js";
import { useDispatch, useSelector } from "react-redux";

export default function TodoPage(): JSX.Element {
  const dispatch = useDispatch();
  const currentStatusType = useSelector(
    (state: any) => state.status.currentStatusType
  );

  const { data } = useQuery({
    queryKey: ["tasks", currentStatusType],
    queryFn: () => getTasks(currentStatusType),
    staleTime: 4000,
    refetchInterval: 4000,
  });
  const countTasks: TodoInfo = data?.info || {
    all: 0,
    completed: 0,
    inWork: 0,
  };
  const allTodo: Todo[] = data?.data || [];

  return (
    <>
      <AddTask />
      <TabsList
        status={currentStatusType}
        setStatus={(status) => dispatch(setStatus(status))}
        countTasks={countTasks}
      />
      <TodoList allTodo={allTodo} />
    </>
  );
}
