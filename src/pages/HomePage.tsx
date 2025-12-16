import { useEffect, useState } from "react";
import { Button } from "antd";
import { logoutUser } from "../api/auth";
import { ProfileRequest } from "../types/auth";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/isAuthSlice";

export default function HomePage(): JSX.Element {
  const [userData, setUserData] = useState<ProfileRequest | null>(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userData.userData);
  const status = useSelector((state) => state.userData.status);
  useEffect(() => {
    function usersDataProfiles() {
      setUserData(user);
    }
    usersDataProfiles();
  }, [status]);

  async function handleLogoutProfile() {
    const response = await logoutUser();
    if (response.answer === "deleted") {
      dispatch(authActions.logout());
    }
  }

  return (
    <>
      {status === "succeeded" ? (
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
      ) : (
        <h1>"Ошибка получения данных"</h1>
      )}
    </>
  );
}
