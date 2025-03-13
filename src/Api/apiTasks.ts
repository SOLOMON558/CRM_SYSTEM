import {
  MetaResponse,
  Todo,
  TodoInfo,
  TodoRequest,
  StatusType,
  UserRegistration,
  Profile,
  AuthData,
  Token,
  RefreshToken,
} from "../types/type";
import axios from "axios";

const apiInstanceV1 = axios.create({
  baseURL: "https://easydev.club/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});
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

export async function postDataUser(
  data: UserRegistration
): Promise<{ data: Profile; status: number } | null> {
  try {
    const response = await apiInstanceV1.post<Profile>("/auth/signup", data);
    return { data: response.data, status: response.status };
  } catch (error: any) {
    if (error.response.status === 409) {
      alert("Данный логин уже занят");
    }
    if (error.response.status === 400) {
      alert("Не валидные данные, попробуйте ещё раз");
    }
    return null;
  }
}
export async function postDataUserSingin(
  dataUser: AuthData
): Promise<{ data: Token; status: number }> {
  try {
    const response = await apiInstanceV1.post<Token>("/auth/signin", dataUser);
    return { data: response.data, status: response.status };
  } catch (error:any) {
    console.error(
      "Ошибка портирования данных",
      error.response?.data || error.message
    );
    return error.response;
  }
}

export async function postRefreshForUpdateAccess(
  refreshToken: RefreshToken
): Promise<Token | null> {
  try {
    const response = await apiInstanceV1.post<Token>(
      "/auth/refresh",
      refreshToken
    );
    return response.data;
  } catch (error:any) {
    console.log(error.response.status);
    return null
    
  }
}

export async function getDataUser(accessToken:string): Promise<{ data: Profile; status: number }| null> {
  try {
    const response = await apiInstanceV1.get<Profile>("/user/profile", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return { data: response.data, status: response.status };
  } catch (error:any) {
    if (error.response.status === 401) {
      try {
        console.log("Ошибка токена 401, перезапрашиваю...");
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken){
        const response = await postRefreshForUpdateAccess({
          refreshToken: refreshToken,
        });
        if (response){
        localStorage.setItem("accessToken", response.accessToken);
        localStorage.setItem("refreshToken", response.refreshToken);
        const accessToken = localStorage.getItem("accessToken")
        if (accessToken) {
          await getDataUser(accessToken);}}
      }} catch {
        console.log("Ошибка перезапроса данных");
        
      }
    } else {
      console.log("ошибка не 401");
      
    }
    return null
  }
}
