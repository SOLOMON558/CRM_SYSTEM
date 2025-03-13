import { StatusType, TodoInfo } from "../types/type";
import { Button } from "antd";
export interface TabsListTypes {
  setStatus: (status: StatusType) => void;
  status: StatusType;
  countTasks: TodoInfo;
}
export default function TabsList({
  setStatus,
  status,
  countTasks,
}: TabsListTypes): JSX.Element {
  function handleCurrentStatusTabList(status: StatusType) {
    setStatus(status);
  }

  return (
    <>
      <Button
        className={`buttonTask ${status === "all" ? "activeButt" : ""}`}
        onClick={() => handleCurrentStatusTabList("all")}
        type="primary"
      >
        Все({countTasks.all})
      </Button>
      <Button
        className={`buttonTask ${status === "inWork" ? "activeButt" : ""}`}
        onClick={() => handleCurrentStatusTabList("inWork")}
        type="primary"
      >
        В работе({countTasks.inWork})
      </Button>
      <Button
        className={`buttonTask ${status === "completed" ? "activeButt" : ""}`}
        onClick={() => handleCurrentStatusTabList("completed")}
        type="primary"
      >
        Завершены({countTasks.completed})
      </Button>
    </>
  );
}
