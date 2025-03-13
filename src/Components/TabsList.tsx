import { StatusType, TodoInfo } from "../types/type";
import { Button } from "antd";
export interface TabsListTypes {
  getAndUpdateTasks: (status: StatusType) => Promise<void>;
  status: StatusType;
  countTasks: TodoInfo;
}
export default function TabsList({
  getAndUpdateTasks,
  status,
  countTasks,
}: TabsListTypes): JSX.Element {
  return (
    <>
      <Button
        className={`buttonTask ${status === "all" ? "activeButt" : ""}`}
        onClick={() => getAndUpdateTasks("all")}
        type="primary"
      >
        Все({countTasks.all})
      </Button>
      <Button
        className={`buttonTask ${status === "inWork" ? "activeButt" : ""}`}
        onClick={() => getAndUpdateTasks("inWork")}
        type="primary"
      >
        В работе({countTasks.inWork})
      </Button>
      <Button
        className={`buttonTask ${status === "completed" ? "activeButt" : ""}`}
        onClick={() => getAndUpdateTasks("completed")}
        type="primary"
      >
        Завершены({countTasks.completed})
      </Button>
    </>
  );
}
