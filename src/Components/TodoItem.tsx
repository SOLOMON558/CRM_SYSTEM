import { Input, Form, Button } from "antd";
import { useState } from "react";
import { updateTaskTitle, deleteTask, updateTaskCompleted } from "../api/api";
import { Todo } from "../types/type";
import { Checkbox } from "antd";
import { CloseSquareOutlined, EditOutlined } from "@ant-design/icons";
interface TodoItemTypes {
  getAndUpdateTasks: () => Promise<void>;
  item: Todo;
}

export default function TodoItem({
  item,
  getAndUpdateTasks,
}: TodoItemTypes): JSX.Element {
  const [form] = Form.useForm();
  const [isEdit, setIsEdit] = useState(false);

  async function handleEditTask(values: { task: string }): Promise<void> {
    const title = values.task;
    await updateTaskTitle(item.id, title);
    await getAndUpdateTasks();
    setIsEdit(false);
    form.resetFields();
  }
  function startEditing() {
    form.setFieldsValue({ task: item.title });
    setIsEdit(true);
  }
  async function handleDeleteTask(id: number): Promise<void> {
    await deleteTask(id);
    await getAndUpdateTasks();
  }

  async function handleChangeCheckboxItem(
    id: number,
    isDone: boolean
  ): Promise<void> {
    await updateTaskCompleted(id, isDone);
    await getAndUpdateTasks();
  }

  return (
    <>
      {!isEdit ? (
        <>
          <Checkbox
            type="checkbox"
            checked={item.isDone ? true : false}
            onChange={() => handleChangeCheckboxItem(item.id, item.isDone)}
          />
          <span className="task liTask">{item.title}</span>
          <button className="bDelete" onClick={startEditing}>
            <EditOutlined />
          </button>
          <button className="bDelete" onClick={() => handleDeleteTask(item.id)}>
            <CloseSquareOutlined />
          </button>
        </>
      ) : (
        <>
          <Form
            form={form}
            name="basic"
            onFinish={handleEditTask}
            style={{ display: "flex", gap: "8px" }}
          >
            <Form.Item
              name="task"
              rules={[
                { min: 2, message: "Минимум 2 символа!" },
                { max: 64, message: "Максимум 64 символа!" },
              ]}
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
              <Button onClick={() => setIsEdit(false)}>Отмена</Button>
            </Form.Item>
          </Form>
        </>
      )}
    </>
  );
}
