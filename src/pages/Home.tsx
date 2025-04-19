import { useEffect, useState } from "react";

import { getDataUser } from "../Api/apiTasksTodo";
import { ProfileRequest } from "../types/type";
import { Navigate, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store/isAuthSlice";
import { accessTokenActions } from "../store/accessTokenSlice";
import { Button } from "antd";
import { getUserData, logoutUser } from "../Api/apiAuth";
import { tokenService } from "../services/token.service";

export default function HomePage() {
  const navigate = useNavigate()
  const [userData, setUserData] = useState(false);

  useEffect(() => {
    async function userData() {
      const response = await getUserData();
      setUserData(response);
      console.log("Мы в юзЭффекте")
    }
    userData();
  }, []);

  function handleLogoutProfile () {
     logoutUser()
  }

  return (
    <>
      <h1 style={{ marginLeft: 20, fontSize: 40 }}>Профиль</h1>
      <h2>Данные профиля:</h2>
      {userData ? (
        <>
          <ul>
            <li>Имя: {userData.username}</li>
            <li>Email: {userData.email}</li>
            <li>PhoneNumber: {userData.phoneNumber}</li>
          </ul>
          <Button onClick={handleLogoutProfile}>LOGOUT</Button>
        </>
      ) : (
        <p>Загрузка данных...</p>
      )}
    </>
  );
}
