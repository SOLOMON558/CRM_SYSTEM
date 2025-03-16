import { useEffect, useState } from "react";
import Menus from "../components/Menu";
import { Button, Flex, Layout } from "antd";
import { getDataUser } from "../api/apiTasks";
import { ProfileRequest } from "../types/type";
import { Navigate, useNavigate } from "react-router";

export default function HomePage() {
  const [userData, setUserData] = useState<ProfileRequest>();
  const [accessToken, setAccessToken] = useState<string| null>(
    localStorage.getItem("accessToken")
  );
  const { Sider, Content } = Layout;
  const navigate = useNavigate()
  const layoutStyle = {
    borderRadius: 8,
    overflow: "hidden",
    width: "calc(50% - 8px)",
    maxWidth: "calc(50% - 8px)",
  };
function handleLogoutProfile(){
  localStorage.removeItem("accessToken")
  localStorage.removeItem("refreshToken")
  navigate("/autoriz")
}
  useEffect(() => {
    async function getUserData() {
      await setAccessToken(localStorage.getItem("accessToken") || "");
        try {
          const userObjectData= await getDataUser(accessToken);
          if (userObjectData){
          setUserData(userObjectData.data);}
        } catch (error) {
          console.log("Ошибка получения данных");
        }
    }
    getUserData();
  }, [accessToken]);

  return (
    <>
      <Flex gap="middle" wrap>
        <Layout style={layoutStyle}>
          <Sider width="200">
            <Menus />
          </Sider>
          <Layout>
            <Content className="content">
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

            </Content>
          </Layout>
        </Layout>
      </Flex>
    </>
  );
}
