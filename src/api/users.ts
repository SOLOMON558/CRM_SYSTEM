import axios from "axios";
import { tokenService } from "../services/token.service";
import { refreshAccessToken } from "./auth";
import { UserFilters, UserRequest, UserRolesRequest } from "../types/users";
import { Roles } from "../Components/users/assignRolesModals/AssignRolesModal";

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
  async (error) => {
    return Promise.reject(error);
  }
);

instanceUsers.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        await refreshAccessToken();

        const newToken = tokenService.accessToken;
        original.headers.Authorization = `Bearer ${newToken}`;
        return instanceUsers(original);
      } catch (error) {
        console.log("Не получилось рефрешнуть");
        return Promise.reject(error);
      }
    }
    console.log("Ошибка не 401");
    return Promise.reject(error);
  }
);

export async function getUsersProfile({
  sortBy = "id",
  sortOrder = "asc",
  isBlocked = "",
  search = "",
}: UserFilters) {
  try {
    const response = await instanceUsers.get(
      `/admin/users?sortBy=${sortBy}&sortOrder=${sortOrder}&limit=1000&isBlocked=${isBlocked}&search=${search}`
    );
    console.log("гет юзерс отправлен", response);
    return response.data;
  } catch (error: any) {
    throw Error("Ошибка/Нет прав");
  }
}
export async function deleteUsersProfile(id: number) {
  const response = await instanceUsers.delete(`/admin/users/${id}`);
  return response;
}
export async function blockedUsersProfile(id: number) {
  try{
  const response = await instanceUsers.post(`/admin/users/${id}/block`);
  return response; }
  catch (error) {
    console.log("Ошибка в блокировке", error)
  }
}
export async function unBlockedUsersProfile(id: number) {
  const response = await instanceUsers.post(`/admin/users/${id}/unblock`);
  return response;
}
export async function editProfileUser(id: number, userData: UserRequest) {
  const response = await instanceUsers.put(`/admin/users/${id}`, userData);
  return response;
}
export async function editRoleUser(id: number, roles:Roles[]) {
  const response = await instanceUsers.post(`/admin/users/${id}/rights`, {
    roles: roles,
  });
  console.log(response, "Обновлены");
  return response;
}

export async function getUserProfileById(id: number) {
  try {
    const response = await instanceUsers.get(`/admin/users/${id}`);
    return response.data;
  } catch (error: any) {
    console.log(error);
  }
}
