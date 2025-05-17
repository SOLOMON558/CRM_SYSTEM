import axios from "axios";
import store from "../store/store";
import { tokenService } from "../services/token.service";
import { authActions } from "../store/isAuthSlice";
import { AuthData, UserRegistration } from "../types/auth";
import { stuffActions } from "../store/isStuff";
import { getUserData, refreshAccessToken } from "./auth";

const instanceUsers = axios.create({
  baseURL: "https://easydev.club/api/v1",
});

instanceUsers.interceptors.request.use(
  (config) => {
    const token = tokenService.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers.accept = "application/json";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export async function getUsersProfile(sortBy = "id", sortOrder = "asc",isBlocked="", search="", first = true) {
  console.log(sortBy, sortOrder, "В гет юзере")
  try {
    const response = await instanceUsers.get(
      `/admin/users?sortBy=${sortBy}&sortOrder=${sortOrder}&limit=1000&isBlocked=${isBlocked}&search=${search}`
    );
    console.log("гет юзерс отправлен", response);
    return response.data;
  } catch (error:any) {
    if (error.status === 401 && first) {
      console.log("Зашли в ошибку");
      await refreshAccessToken();
      return await getUsersProfile(sortBy, sortOrder, false);
    }
    else {
      throw Error("Ошибка/Нет прав")
    }
  }
}
export async function deleteUsersProfile(id:number) {
  const response = await instanceUsers.delete(`/admin/users/${id}`);
  return response;
}
export async function blockedUsersProfile(id:number) {
  const response = await instanceUsers.post(`/admin/users/${id}/block`);
  return response;
}
export async function unBlockedUsersProfile(id:number) {
  const response = await instanceUsers.post(`/admin/users/${id}/unblock`);
  return response;
}
export async function editProfileUser(id, userData) {
  const response = await instanceUsers.put(`/admin/users/${id}`, userData);
  return response;
}
export async function editRoleUser(id, roles) {
  const response = await instanceUsers.post(`/admin/users/${id}/rights`, {
    roles: roles,
  });
  console.log(response, "Обновлены");
  return response;
}



export async function getUserProfileById(id,first = true) {
  try {
    const response = await instanceUsers.get(
      `/admin/users/${id}`
    );
    return response.data;
  } catch (error) {
    if (error.status === 401 && first) {
      await refreshAccessToken();
      return await getUserProfileById(id, false);
    }
  }
}