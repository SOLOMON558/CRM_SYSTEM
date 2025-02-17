import { useState } from "react";
import { easyDevPost } from "../Api/Api.js";
export default function TaskAdd({ connect, status }) {
  let [newTask, setNewTask] = useState("");
  let [placeHolder, setPlaceHolder] = useState("Введите задачу");

  async function clickAddTask(value) {
    if (value.length > 2 && value.length < 64) {
      let data = { isDone: false, title: value };
      await easyDevPost(data);
      setNewTask("");
      setPlaceHolder("Введите задачу");
      await connect(status);
    } else if (value.length > 64) {
      setNewTask("");
      setPlaceHolder("Не более 64 символов!");
    } else if (value.length < 2) {
      setPlaceHolder("Не менее 2 символов!");
      setNewTask("");
    }
  }
  return (
    <div>
      <input
        className="divAdd"
        id="placeholder"
        type="text"
        placeholder={placeHolder}
        value={newTask}
        onChange={(event) => setNewTask(event.target.value)}
      />
      <button className="buttonInput" onClick={() => clickAddTask(newTask)}>
        Add
      </button>
    </div>
  );
}
