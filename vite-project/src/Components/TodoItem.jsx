import korzina from "../assets/korzina.png";
import editpng from "../assets/edit.png";
import { useState } from "react";
import {
  updateTaskTitle,
  deleteTask,
  updateTaskCompleted,
} from "../Api/Api.js";
export default function TodoItem({ item, connectToStatus, status }) {
  const [editTask, setEditTask] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  async function handleEditTask(value, number) {
    await updateTaskTitle(number, value);
    await connectToStatus(status);
    setIsEdit(false);
    setEditTask("");
  }
  async function handleDeleteTask(number) {
    await deleteTask(number);
    await connectToStatus(status);
  }
  async function handleChangeCheckboxItem(number, bool) {
    await updateTaskCompleted(number, bool);
    await connectToStatus(status);
  }

  return (
    <li className="liTask">
      {!isEdit ? (
        <>
          <input
            type="checkbox"
            checked={item.checked ? "checked" : ""}
            onChange={() => handleChangeCheckboxItem(item.id, item.checked)}
          />
          <span className="task">{item.name}</span>
          <button className="bDelete" onClick={() => setIsEdit(true)}>
            <img className="delete" src={editpng} />
          </button>
          <button className="bDelete" onClick={() => handleDeleteTask(item.id)}>
            <img className="delete" src={korzina} />
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            value={editTask}
            onChange={(event) => setEditTask(event.target.value)}
          />
          <button onClick={() => handleEditTask(editTask, item.id)}>
            Save
          </button>
          <button onClick={() => setIsEdit(false)}>Отмена</button>
        </>
      )}
    </li>
  );
}
