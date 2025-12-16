import { Roles } from "../components/users/assignRolesModals/AssignRolesModal";

export interface UserFilters {
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  isBlocked?: boolean | "";
  limit?: number; // сколько на странице
  offset?: number; // страницу
}

// Интерфейс пользователя
export interface User {
  id: number;
  username: string;
  email: string;
  date: string; // ISO date string
  isBlocked: boolean;
  roles: Roles[];
  phoneNumber: string;
}
// Интерфейс метаинформации

export interface MetaResponse<T> {
  data: T[];
  meta: {
    totalAmount: number;
    sortBy: string;
    sortOrder: "asc" | "desc";
  };
}
// Интерфейс для обновления прав пользователя
export interface UserRolesRequest {
  roles: Roles[]; 

}

// Интерфейс для обновления данных пользователя
export interface UserRequest {
  username?: string;
  email?: string;
  phoneNumber?: string;
}
export type Modal = 'delete' | 'block' | 'roles'

