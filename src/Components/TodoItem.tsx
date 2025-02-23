import korzina from "../assets/korzina.png";
import editpng from "../assets/edit.png";
import { useState } from "react";
import { updateTaskTitle, deleteTask, updateTaskCompleted } from "../api/Api";
import {TodoItemTypes} from "../types/type"

export default function TodoItem({ item, getAndUpdateTasks }:TodoItemTypes): JSX.Element {
  const [editTask, setEditTask] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  async function handleEditTask(title: string, id: number): Promise<void> {
    await updateTaskTitle(id, title);
    await getAndUpdateTasks();
    setIsEdit(false);
    setEditTask("");
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
    <li className="liTask">
      {!isEdit ? (
        <>
          <input
            type="checkbox"
            checked={item.isDone ? true : false}
            onChange={() => handleChangeCheckboxItem(item.id, item.isDone)}
          />
          <span className="task">{item.title}</span>
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
