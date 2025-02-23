import {TabsListTypes } from "../types/type";
export default function TabsList({ getAndUpdateTasks, status, countTasks }:TabsListTypes):JSX.Element {
  return (
    <>
      <button
        className={`buttonTask ${status === "all" ? "activeButt" : ""}`}
        onClick={() => getAndUpdateTasks("all")}
      >
        Все({countTasks.all})
      </button>
      <button
        className={`buttonTask ${status === "inWork" ? "activeButt" : ""}`}
        onClick={() => getAndUpdateTasks("inWork")}
      >
        В работе({countTasks.inWork})
      </button>
      <button
        className={`buttonTask ${status === "completed" ? "activeButt" : ""}`}
        onClick={() => getAndUpdateTasks("completed")}
      >
        Завершены({countTasks.completed})
      </button>
    </>
  );
}
