export default function ChangeTask({ children, activeTask, taskClick, tasks }) {
  return (
    <button
      className={`buttonTask ${activeTask === "active" ? "activeButt" : ""}`}
      onClick={taskClick}
    >
      {children}
    </button>
  );
}
