import korzina from "../assets/korzina.png";
import editpng from "../assets/edit.png";
import { useState } from "react";
import { easyDevEdit, easyDevDelete, easyDevPut } from "../Api/Api.js";
export default function TodoItem({ item,connect }) {
  let [editTask, setEditTask] = useState("");
  let [edit, setEdit] = useState(undefined);

  function cancelClick() {
    setEdit(null);
  }
  function editClick(number) {
    setEdit(number);
  }
  async function editTaskClick(value, number) {
    await easyDevEdit(number, value);
    await connect();
    setEdit(null);
    setEditTask("");
  }
  async function deleteClick(number) {
    await easyDevDelete(number);
    await connect();
  }
  async function checkboxChange(number, bool) {
    await easyDevPut(number, bool);
    await connect();
  }

  return (
    <li className="liTask">
      {edit !== item.id ? (
        <>
          <input
            type="checkbox"
            checked={item.checked ? "checked" : ""}
            onChange={() => checkboxChange(item.id, item.checked)}
          />
          <span className="task">{item.name}</span>
          <button className="bDelete" onClick={() => editClick(item.id)}>
            <img className="delete" src={editpng} />
          </button>
          <button className="bDelete" onClick={() => deleteClick(item.id)}>
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
          <button onClick={() => editTaskClick(editTask, item.id)}>Save</button>
          <button onClick={cancelClick}>Отмена</button>
        </>
      )}
    </li>
  );
}
