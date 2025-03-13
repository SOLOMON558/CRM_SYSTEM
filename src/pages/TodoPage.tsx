import { useState, useEffect } from "react";
import { getTasks } from "../api/api";
import TodoList from "../components/TodoList";
import AddTask from "../components/AddTask";
import TabsList from "../components/TabsList";
import { StatusType, Todo, TodoInfo } from "../types/type";
import Menus from "../components/Menu";
import { Flex, Layout } from "antd";

const { Sider, Content } = Layout;

const layoutStyle = {
  borderRadius: 8,
  overflow: "hidden",
  width: "calc(50% - 8px)",
  maxWidth: "calc(50% - 8px)",
};

export default function TodoPage() {
  const [allTodo, setAllTodo] = useState<Todo[]>([]);
  const [currentStatusType, setCurrentStatusType] = useState<StatusType>("all");
  const [countTasks, setCountTasks] = useState<TodoInfo>({
    all: 0,
    completed: 0,
    inWork: 0,
  });

  async function getAndUpdateTasks(status: StatusType): Promise<void> {
    setCurrentStatusType(status);
    const result = await getTasks(status);

    if (result.info) {
      setCountTasks({
        all: result.info.all,
        completed: result.info.completed,
        inWork: result.info.inWork,
      });
    }

    setAllTodo(result.data);
  }

  useEffect(() => {
    const reloadTodoList = async () =>
      await getAndUpdateTasks(currentStatusType);
    reloadTodoList();
    const interval = setInterval(reloadTodoList, 4000);
    return () => clearInterval(interval);
  }, [currentStatusType]);

  return (
    <>
      <Flex gap="middle" wrap>
        <Layout style={layoutStyle}>
          <Sider width="36%">
            <Menus />
          </Sider>
          <Layout>
            <Content className="content">
              <AddTask
                getAndUpdateTasks={() => getAndUpdateTasks(currentStatusType)}
              />
              <TabsList
                getAndUpdateTasks={getAndUpdateTasks}
                status={currentStatusType}
                countTasks={countTasks}
              />
              <TodoList
                allTodo={allTodo}
                getAndUpdateTasks={() => getAndUpdateTasks(currentStatusType)}
              />
            </Content>
          </Layout>
        </Layout>
      </Flex>
    </>
  );
}
