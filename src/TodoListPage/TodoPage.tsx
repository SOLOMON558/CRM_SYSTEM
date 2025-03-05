import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getTasks } from "../api/Api";
import TodoList from "../components/TodoList";
import AddTask from "../components/AddTask";
import TabsList from "../components/TabsList";
import { Todo, TodoInfo } from "../types/type";
import Drawers from "../components/Drawer";
import { setStatus } from "../store/Slice";
import { useDispatch, useSelector } from "react-redux";

export default function TodoPage() {
  const dispatch = useDispatch();
  const currentStatusType = useSelector(
    (state) => state.status.currentStatusType
  );

  const { data} = useQuery({
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
      <AddTask/>
      <TabsList
        status={currentStatusType}
        setStatus={(status) => dispatch(setStatus(status))}
        countTasks={countTasks}
      />
      <TodoList allTodo={allTodo}/>
      <Drawers />
    </>
  );
}
