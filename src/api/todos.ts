import {
  MetaResponse,
  Todo,
  TodoInfo,
  TodoRequest,
  StatusType,
} from "../types/todos";
import axios from "axios";

const apiInstance = axios.create({
  baseURL: "https://easydev.club/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});
export async function getTasks(
  status: StatusType
): Promise<MetaResponse<Todo, TodoInfo>> {
  try {
    const response = await apiInstance.get("/todos", {
      params: { filter: status },
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка получения файлов", error);
    throw error;
  }
}

export async function postTask(data: TodoRequest): Promise<void> {
  try {
    await apiInstance.post("/todos", data);
  } catch (error) {
    console.error("Ошибка портирования данных", error);
  }
}

export async function updateTaskCompleted(
  id: number,
  isDone: boolean
): Promise<void> {
  try {
    await apiInstance.put(`/todos/${id}`, { isDone: !isDone });
  } catch (error) {
    console.error("Ошибка изменения данных", error);
  }
}

export async function updateTaskTitle(
  id: number,
  title: string
): Promise<void> {
  try {
    await apiInstance.put(`/todos/${id}`, { title: title });
  } catch (error) {
    console.error("Ошибка изменения данных", error);
  }
}

export async function deleteTask(id: number): Promise<void> {
  try {
    await apiInstance.delete(`/todos/${id}`);
  } catch (error) {
    console.error("Ошибка удаления данных", error);
  }
}



