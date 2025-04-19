import { RefreshToken } from "./../types/type";
import axios from "axios";
import store from "../store/store";
import { accessTokenActions } from "../store/accessTokenSlice";
import { tokenService } from "../services/token.service";
import { authActions } from "../store/isAuthSlice";
const instanceAuth = axios.create({
  baseURL: "https://easydev.club/api/v1",
});

export async function postDataSignupUser(dataSignupUser) {
  const response = await instanceAuth.post("/auth/signup", dataSignupUser);
  return response;
}
export async function postDataSigninUser(dataSigninUser) {
  const response = await instanceAuth.post("/auth/signin", dataSigninUser);
  return response;
}

export async function getUserData(first = true) {
  try {
    const token = tokenService.getAccessToken();
    console.log("Взяли токен для данных", token);
    const response = await instanceAuth.get("/user/profile", {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    if (error.status === 401 && first) {
      console.log("Зашли в ошибку");
      await refreshAccessToken();
      return await getUserData(false);
    }
  }
}

export async function refreshAccessToken() {
  console.log("Зашли в рефреш");
  try {
    const refreshToken = localStorage.getItem("refreshToken") || null;
    const response = await instanceAuth.post(
      "/auth/refresh",
      {
        refreshToken: refreshToken,
      },
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
    tokenService.setAccessToken(response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);
  } catch (error) {
    console.log("рефреш умер");
    logoutUser();
  }
}

export async function logoutUser() {
  tokenService.clearAccessToken();
  localStorage.removeItem("refreshToken");
  store.dispatch(authActions.logout());
  window.location.href = "/signin";
}
