import { useEffect, useState } from "react";
import { Button } from "antd";
import { getUserData, logoutUser } from "../api/auth";
import { ProfileRequest } from "../types/auth";

export default function HomePage(): JSX.Element {
  const [userData, setUserData] = useState<ProfileRequest | null>(null);

  useEffect(() => {
    async function userData() {
      const response = await getUserData();
      setUserData(response);
      console.log("Мы в юзЭффекте");
    }
    userData();
  }, []);

  function handleLogoutProfile() {
    logoutUser();
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
