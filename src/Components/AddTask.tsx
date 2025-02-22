import { useState } from "react";
import { postTask } from "../Api/Api";
interface AddTaskTypes{
  status: string;
  connectToStatus: (status:string) => void;
}
export default function AddTask({ connectToStatus, status }:AddTaskTypes):JSX.Element {

  const [newTask, setNewTask] = useState("");
  async function handleAddTask(value:string, event:any) {
    event.preventDefault();
    if (value.length > 2 && value.length < 64) {
      const data = { isDone: false, title: value };
      await postTask(data);
      await connectToStatus(status);
      setNewTask("");
    } else if (value.length > 64) {
      alert("Не более 64 символов!");
      setNewTask("");
    } else if (value.length < 2) {
      alert("Не менее 2 символов!");
      setNewTask("");
    }
  }
  return (
    <form onSubmit={async (event) => await handleAddTask(newTask, event)}>
      <input
        className="divAdd"
        id="placeholder"
        type="text"
        placeholder="Введите задачу"
        value={newTask}
        onChange={(event) => setNewTask(event.target.value)}
      />
      <button className="buttonInput" type="submit">
        Add
      </button>
    </form>
  );
}
