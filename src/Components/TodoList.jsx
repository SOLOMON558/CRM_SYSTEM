import TodoItem from "./TodoItem";
export default function TodoList({ connectToStatus, task, status }) {
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
