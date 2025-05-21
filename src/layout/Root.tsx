import { Flex, Layout } from "antd";
import MainNavigation from "../Components/MainNavigation";
import { Outlet} from "react-router";

const { Sider, Content } = Layout;

const layoutStyle = {
  borderRadius: 8,
  overflow: "hidden",
  width: "calc(50% - 8px)",
  maxWidth: "calc(50% - 8px)",
};
export default function RootLayout(): JSX.Element {
  

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
