import TodoItem from "./TodoItem";
export default function TaskComp({
  connect,
  task,
  status
}) {
  return (
    <span>
      <ul >
        {task.map((item) => (
          <TodoItem
            status={status}
            connect={connect}
            key={item.id}
            item={item}
          />
        ))}
      </ul>
    </span>
  );
}
