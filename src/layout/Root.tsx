import { Flex, Layout, Spin } from "antd";
import MainNavigation from "../components/MainNavigation";
import { Outlet, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUserData } from "../store/userData";
import { stuffActions } from "../store/isStuff";
const { Sider, Content } = Layout;

const layoutStyle = {
  borderRadius: 8,
  overflow: "hidden",
  width: "calc(50% - 8px)",
  maxWidth: "calc(100% - 8px)",
};
export default function RootLayout(): JSX.Element {
  console.log("Рут загрузился");
  const user = useSelector((state) => state.userData.userData);
  const status = useSelector((state) => state.userData.status);
  const dispatch = useDispatch();
  const location = useLocation();
 
  useEffect(() => {
    async function getUserData() {
      dispatch(fetchUserData());
    }
    getUserData();
  }, [location.pathname]);

  useEffect(() => {
    async function getUserData() {
      if (status === "succeeded") {
        if (user) {
          user.roles.forEach((el: string) => {
            if (el === "ADMIN") {
              dispatch(stuffActions.setAdminStatus());
              console.log("Стал админом");
            }
            if (el === "MODERATOR") {
              dispatch(stuffActions.setModerStatus());
              console.log("Стал модератором");
            }
          });
        }
      }
    }
    getUserData();
  }, [status]);

  if (status === "loading" || status === "idle") {
    return (
      <Flex justify="center" align="center" style={{ height: "100vh" }}>
        <Spin size="large" tip="Загрузка пользователя..." />
      </Flex>
    );
  }

  return (
    <Flex gap="small" wrap>
      <Layout style={layoutStyle}>
        <Sider width="150">
          <MainNavigation />
        </Sider>
        <Layout>
          <Content className="content">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Flex>
  );
}
