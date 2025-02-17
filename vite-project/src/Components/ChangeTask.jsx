export default function ChangeTask({ connectToStatus, status, countTasks }) {
  return (
    <>
      <button
        className={`buttonTask ${status === "all" ? "activeButt" : ""}`}
        onClick={() => connectToStatus("all")}
      >
        Все({countTasks[0]})
      </button>
      <button
        className={`buttonTask ${status === "inWork" ? "activeButt" : ""}`}
        onClick={() => connectToStatus("inWork")}
      >
        В работе({countTasks[1]})
      </button>
      <button
        className={`buttonTask ${status === "completed" ? "activeButt" : ""}`}
        onClick={() => connectToStatus("completed")}
      >
        Завершены({countTasks[2]})
      </button>
    </>
  );
}
