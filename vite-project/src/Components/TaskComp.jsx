import TodoItem from "./TodoItem";
export default function TaskComp({
  connect,
  task,
  activeTask
}) {
  return (
    <span>
      <ul className={activeTask}>
        {task.map((item, index) => (
          <TodoItem
            connect={connect}
            key={index}
            item={item}
          />
        ))}
      </ul>
    </span>
  );
}
