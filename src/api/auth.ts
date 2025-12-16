import axios from "axios";
import { tokenService } from "../services/token.service";
import { AuthData, UserRegistration } from "../types/auth";

const instanceAuth = axios.create({
  baseURL: "https://easydev.club/api/v1",
});

instanceAuth.interceptors.request.use(
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

instanceAuth.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    console.log("ОРИГИНАЛ", original);
    if (original.url.includes("/auth/refresh")) {
      return logoutUser();
    }
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        await refreshAccessToken();
        const newToken = tokenService.accessToken;
        original.headers.Authorization = `Bearer ${newToken}`;
        return instanceAuth(original);
      } catch (error) {
        console.log("Не получилось рефрешнуть");
        return Promise.reject(error);
      }
    }
    console.log("Ошибка не 401");
    return Promise.reject(error);
  }
);

export async function postDataSignupUser(dataSignupUser: UserRegistration) {
  const response = await instanceAuth.post("/auth/signup", dataSignupUser);
  try {
    if (response.status === 201) {
      alert("Успешная регистрация");
      return "Успешная регистрация";
    }
  } catch (error: any) {
    console.log(error.response.status);
    alert(`Ошибка при регистрации ${error.response.data}`);
    return null;
  }
}

export async function postDataSigninUser(dataSigninUser: AuthData) {
  try {
    const response = await instanceAuth.post("/auth/signin", dataSigninUser);
    console.log(response);
    if (response.request.status === 200) {
      alert("Успешный вход");
      localStorage.setItem("refreshToken", response.data.refreshToken);
      return response.data;
    }
  } catch (error: any) {
    console.log(error);
    if (error.response.status === 401) {
      throw new Error("неправильные данные");
    }
    if (error.response.status === 500) {
      throw new Error("ошибка сервера");
    }
    if (error.response.status === 400) {
      throw new Error("невалидные данные(неправильный ввод)");
    }
    return null;
  }
}

export async function getUserData(first: boolean = true) {
  try {
    const token = tokenService.accessToken;
    console.log("Взяли токен для данных", token);
    const response = await instanceAuth.get("/user/profile");
    console.log(response);

    return response.data;
  } catch (error: any) {
    console.log("Ошибка получения пользователя profile");
  }
}

export async function refreshAccessToken() {
  console.log("Зашли в рефреш");
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      const response = await instanceAuth.post("/auth/refresh", {
        refreshToken: refreshToken,
      });
      console.log(response);
      tokenService.accessToken = response.data.accessToken;
      localStorage.setItem("refreshToken", response.data.refreshToken);
    } else {
      console.log("Рефреша нет в локале");
      logoutUser();
    }
  } catch (error) {
    console.log("рефреш умер");
    logoutUser();
  }
}

export async function logoutUser() {
  tokenService.clearAccessToken();
  localStorage.removeItem("refreshToken");

  // store.dispatch(authActions.logout());
  window.location.href = "/signin";
  return { answer: "deleted" };
}
