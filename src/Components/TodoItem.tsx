import { Input, Form, Button } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  updateTaskTitle,
  deleteTask,
  updateTaskCompleted,
} from "../Api/apiTasksTodo";
import { Todo } from "../types/type";
import { Checkbox } from "antd";
import { CloseSquareOutlined, EditOutlined } from "@ant-design/icons";
interface TodoItemTypes {
  item: Todo;
}

export default function TodoItem({ item }: TodoItemTypes): JSX.Element {
  const [form] = Form.useForm();
  const [isEdit, setIsEdit] = useState(false);
  const queryClient = useQueryClient();

  async function handleEditTask(values: { task: string }): Promise<void> {
    const title = values.task;
    editTitleTaskMutation.mutate(title);
  }
  const editTitleTaskMutation = useMutation({
    mutationFn: (title: string) => updateTaskTitle(item.id, title),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setIsEdit(false);
      form.resetFields();
    },
  });

  function startEditing() {
    form.setFieldsValue({ task: item.title });
    setIsEdit(true);
  }

  async function handleDeleteTask(): Promise<void> {
    deleteTaskMutation.mutate();
  }
  const deleteTaskMutation = useMutation({
    mutationFn: () => deleteTask(item.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  async function handleChangeCheckboxItem(isDone: boolean): Promise<void> {
    editBoolTaskMutation.mutate(isDone);
  }
  const editBoolTaskMutation = useMutation({
    mutationFn: (isDone: boolean) => updateTaskCompleted(item.id, isDone),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  return (
    <>
      {!isEdit ? (
        <>
          <Checkbox
            type="checkbox"
            checked={item.isDone ? true : false}
            onChange={() => handleChangeCheckboxItem(item.isDone)}
          />
          <span className="task">{item.title}</span>
          <button className="bDelete" onClick={startEditing}>
            <EditOutlined />
          </button>
          <button className="bDelete" onClick={handleDeleteTask}>
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
