import { postTask } from "../api/Api";
import { Input, Form, Button } from "antd";

interface AddTaskTypes {
  getAndUpdateTasks: () => Promise<void>;
}

export default function AddTask({
  getAndUpdateTasks,
}: AddTaskTypes): JSX.Element {
  const [form] = Form.useForm();

  async function handleAddTask(value: { task: string }) {
    const newTask = value.task;
    if (newTask.length >= 2 && newTask.length < 64) {
      const data = { isDone: false, title: newTask };
      await postTask(data);
      await getAndUpdateTasks();
      form.resetFields();
    }
  }
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
