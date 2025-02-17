import TodoItem from "./TodoItem";
export default function TaskComp({
  connect,
  task,
  activeTask
}) {
  return (
    <span>
      <ul >
        {task.map((item) => (
          <TodoItem
            connect={connect}
            key={item.id}
            item={item}
          />
        ))}
      </ul>
    </span>
  );
}
