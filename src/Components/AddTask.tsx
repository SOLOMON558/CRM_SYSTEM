import { postTask } from "../Api/apiTasksTodo";
import { Input, Form, Button } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TodoRequest } from "../types/type";

export default function AddTask(): JSX.Element {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  async function handleAddTask(value: { task: string }) {
    const newTask = value.task;
    const data = { isDone: false, title: newTask };
    addTaskMutation.mutate(data);
  }
  const addTaskMutation = useMutation({
    mutationFn: (data: TodoRequest) => postTask(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      form.resetFields();
    },
  });

  return (
    <Form
      form={form}
      style={{ display: "flex", gap: "8px" }}
      name="basic"
      onFinish={handleAddTask}
    >
      <Form.Item
        name="task"
        rules={[
          { min: 2, message: "Минимум 2 символа!" },
          { max: 64, message: "Максимум 64 символа!" },
        ]}
      >
        <Input
          className="divAdd"
          id="placeholder"
          type="text"
          placeholder="Введите задачу"
        />
      </Form.Item>
      <Form.Item>
        <Button id="buttonInput" type="primary" htmlType="submit">
          Add
        </Button>
      </Form.Item>
    </Form>
  );
}
