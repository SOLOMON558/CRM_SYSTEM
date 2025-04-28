import { redirect } from "react-router";
import store from "../store/store";

export async function checkAuthLoader() {
  const isAuth = store.getState().autorization.isAuth;
  const isRefresh = localStorage.getItem("refreshToken");
  if (isAuth || isRefresh) {
    return null;
  } else {
    return redirect("/signin");
  }
}
