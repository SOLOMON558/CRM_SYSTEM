import TodoItem from "./TodoItem";
import { Todo } from "../types/type";
import { List} from "antd";
interface TodoListTypes {
  allTodo: Todo[];
}
export default function TodoList({
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
