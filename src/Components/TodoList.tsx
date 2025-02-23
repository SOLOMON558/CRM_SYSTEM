import TodoItem from "./TodoItem";
import {TodoListTypes} from "../types/type"

export default function TodoList({ getAndUpdateTasks, allTodo}:TodoListTypes): JSX.Element {
  return (
    <ul>
      {allTodo.map((item) => (
        <TodoItem
        getAndUpdateTasks={getAndUpdateTasks}
          key={item.id}
          item={item}
        />
      ))}
    </ul>
  );
}
