import { useState } from "react";
import { postTask } from "../api/Api";
import {AddTaskTypes } from "../types/type";


export default function AddTask({ getAndUpdateTasks}:AddTaskTypes):JSX.Element {

  const [newTask, setNewTask] = useState("");
  async function handleAddTask(title:string, event:any) {
    event.preventDefault();
    if (title.length > 2 && title.length < 64) {
      const data = { isDone: false, title: title };
      await postTask(data);
      await getAndUpdateTasks();
      setNewTask("");
    } else if (title.length > 64) {
      alert("Не более 64 символов!");
      setNewTask("");
    } else if (title.length < 2) {
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
