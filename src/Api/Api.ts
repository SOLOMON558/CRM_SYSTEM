import { MetaResponse, Todo, TodoInfo, TodoRequest, StatusType,DataObject } from "../types/type";

export async function getTasks(status:StatusType): Promise<MetaResponse<Todo, TodoInfo>> {
  try {
    const response = await fetch(
      `https://easydev.club/api/v2/todos?filter=${status}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    return await response.json();
  } catch (error) {
    console.error("Ошибка получения файлов", error);
    throw error
  }
}

export async function postTask(data:DataObject): Promise<void> {
  try {
    await fetch("https://easydev.club/api/v2/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error("Ошибка портирования данных", error);
  }
}

export async function updateTaskCompleted(id:number, isDone:boolean): Promise<void> {
  try {
    await fetch(`https://easydev.club/api/v2/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isDone: !isDone }),
    });
  } catch (error) {
    console.error("Ошибка изменения данных", error);
  }
}

export async function updateTaskTitle(id:number, title:string): Promise<void> {
  try {
    await fetch(`https://easydev.club/api/v2/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: title }),
    });
  } catch (error) {
    console.error("Ошибка изменения данных", error);
  }
}

export async function deleteTask(id:number): Promise<void> {
  try {
    await fetch(`https://easydev.club/api/v2/todos/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Ошибка удаления данных", error);
  }
}
