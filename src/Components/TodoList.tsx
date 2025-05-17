import TodoItem from "./TodoItem";
import { Todo } from "../types/todos";
import { List } from "antd";
interface TodoListTypes {
  allTodo: Todo[];
}
export default function TodoList({ allTodo }: TodoListTypes): JSX.Element {
  return (
    <>
      <List
        className="list"
        size="small"
        bordered={true}
        dataSource={allTodo}
        renderItem={(item) => (
          <List.Item className="todoItemBlock">
            {<TodoItem key={item.id} item={item} />}
          </List.Item>
        )}
      />
    </>
  );
}
