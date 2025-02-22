import TodoItem from "./TodoItem";
import { AllTodoTypes } from "../TodoListPage/App";
interface TodoListTypes{
  task: AllTodoTypes[];
  status: string;
  connectToStatus: (status:string) => void;
}

export default function TodoList({ connectToStatus, task, status }:TodoListTypes): JSX.Element {
  return (
    <ul>
      {task.map((item) => (
        <TodoItem
          status={status}
          connectToStatus={connectToStatus}
          key={item.id}
          item={item}
        />
      ))}
    </ul>
  );
}
