import { MetaResponse, Todo, TodoInfo, TodoRequest, StatusType} from "../types/type";
import axios from "axios";

export async function getTasks(status:StatusType): Promise<MetaResponse<Todo, TodoInfo>> {
  try {
    const response = await axios.get(
      `https://easydev.club/api/v2/todos?filter=${status}`,
      {
        headers: { "Content-Type": "application/json" },
      });
    return ( await response.data)
  } catch (error) {
    console.error("Ошибка получения файлов", error);
    throw error
  }
}

export async function postTask(data:TodoRequest): Promise<void> {
  try {
    await axios.post("https://easydev.club/api/v2/todos", 
      data,
      {
        headers: { "Content-Type": "application/json" }
      });
  } catch (error) {
    console.error("Ошибка портирования данных", error);
  }
}

export async function updateTaskCompleted(id:number, isDone:boolean): Promise<void> {
  try {
    await axios.put(`https://easydev.club/api/v2/todos/${id}`, 
      { isDone: !isDone },
      {
      headers: { "Content-Type": "application/json" },
      });
  } catch (error) {
    console.error("Ошибка изменения данных", error);
  }
}

export async function updateTaskTitle(id:number, title:string): Promise<void> {
  try {
    await axios.put(`https://easydev.club/api/v2/todos/${id}`, 
      { title: title },
      {
      headers: { "Content-Type": "application/json" },
      });
  } catch (error) {
    console.error("Ошибка изменения данных", error);
  }
}

export async function deleteTask(id:number): Promise<void> {
  try {
    await axios.delete(`https://easydev.club/api/v2/todos/${id}`, 
      {
      headers: { "Content-Type": "application/json" },
      });
  } catch (error) {
    console.error("Ошибка удаления данных", error);
  }
}
