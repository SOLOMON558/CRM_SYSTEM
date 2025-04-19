import { Flex, Layout } from "antd";
import MainNavigation from "../Components/MainNavigation";
import { Outlet, useNavigate } from "react-router";
import { useEffect } from "react";
import { getUserData } from "../Api/apiAuth";
import { checkAccessToken } from "../Api/helpersFunction";
const { Sider, Content } = Layout;

const layoutStyle = {
  borderRadius: 8,
  overflow: "hidden",
  width: "calc(50% - 8px)",
  maxWidth: "calc(50% - 8px)",
};
export default function RootLayout() {
  const navigate = useNavigate();



  return (
    <Flex gap="middle" wrap>
      <Layout style={layoutStyle}>
        <Sider width="200">
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
