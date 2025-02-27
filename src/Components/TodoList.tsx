import TodoItem from "./TodoItem";
import { Todo } from "../types/type";
import { List, Divider } from "antd";
interface TodoListTypes {
  getAndUpdateTasks: () => Promise<void>;
  allTodo: Todo[];
}
export default function TodoList({
  getAndUpdateTasks,
  allTodo,
}: TodoListTypes): JSX.Element {
  return (
    <>
      <ul>
        <List
          className="list"
          size="small"
          bordered={true}
          dataSource={allTodo}
          renderItem={(item) => (
            <List.Item className="todoItemBlock">
              {
                <li className="liTask">
                  <TodoItem
                    getAndUpdateTasks={getAndUpdateTasks}
                    key={item.id}
                    item={item}
                  />
                </li>
              }
            </List.Item>
          )}
        />
      </ul>
    </>
  );
}
