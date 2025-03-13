import { useQuery} from "@tanstack/react-query";
import { getTasks } from "../api/apiTasks.js";
import TodoList from "../components/TodoList.js";
import AddTask from "../components/AddTask.js";
import TabsList from "../components/TabsList.js";
import { Todo, TodoInfo } from "../types/type.js";
import { setStatus } from "../store/Slice.js";
import { useDispatch, useSelector } from "react-redux";
import Menus from "../components/Menu.js";
import { Flex, Layout } from "antd";

const { Sider, Content } = Layout;

const layoutStyle = {
  borderRadius: 8,
  overflow: "hidden",
  width: "calc(50% - 8px)",
  maxWidth: "calc(50% - 8px)",
};
export default function TodoPage() {
  const dispatch = useDispatch();
  const currentStatusType = useSelector(
    (state: any) => state.status.currentStatusType
  );

  const { data } = useQuery({
    queryKey: ["tasks", currentStatusType],
    queryFn: () => getTasks(currentStatusType),
    staleTime: 4000,
    refetchInterval: 4000,
  });
  const countTasks: TodoInfo = data?.info || {
    all: 0,
    completed: 0,
    inWork: 0,
  };
  const allTodo: Todo[] = data?.data || [];

  return (
    <>
      <Flex gap="middle" wrap>
        <Layout style={layoutStyle}>
          <Sider width="200">
            <Menus />
          </Sider>
          <Layout>
            <Content className="content">
              <AddTask />
              <TabsList
                status={currentStatusType}
                setStatus={(status) => dispatch(setStatus(status))}
                countTasks={countTasks}
              />
              <TodoList allTodo={allTodo} />
            </Content>
          </Layout>
        </Layout>
      </Flex>
    </>
  );
}
