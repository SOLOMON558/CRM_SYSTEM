import { RefreshToken } from './../types/type';
import { redirect } from "react-router";
import  store  from "../store/store"
import { getUserData, postDataSigninUser, postDataSignupUser, refreshAccessToken } from "./apiAuth";
import { authActions } from '../store/isAuthSlice';



export async function tryRegisterUser(data) {
    
    try {
      const response = await postDataSignupUser(data);
      if (response.status === 201) {
        alert("Успешная регистрация")

        return "Успешная регистрация"
        
      }
    } catch (error) {
      console.log(error.response.status);
      alert(`Ошибка при регистрации ${error.response.data}`);
      return null
    }
  }
  export async function tryLoginUser(data) {
    
    try {
      const response = await postDataSigninUser(data);
      console.log(response)
      if (response.request.status === 200) {
        alert("Успешный вход")
        localStorage.setItem("refreshToken", response.data.refreshToken)
        store.dispatch(authActions.login())
        return response.data
      }
    } catch (error) {
      console.log(error);
      if (error.response.status===401){
        alert('Неправильные данные')
      }
      if (error.response.status===500){
        alert('Ошибка сервера')
      }
      if (error.response.status===400){
        alert('Невалидные данные(неправильный ввод)')
      }
      return null
    }
  }

