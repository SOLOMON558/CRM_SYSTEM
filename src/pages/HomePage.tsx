import Menus from "../components/Menu";
import { Flex, Layout } from "antd";
export default function HomePage() {
  const { Sider, Content } = Layout;
  const layoutStyle = {
    borderRadius: 8,
    overflow: "hidden",
    width: "calc(50% - 8px)",
    maxWidth: "calc(50% - 8px)",
  };

  return (
    <>
      <Flex gap="middle" wrap>
        <Layout style={layoutStyle}>
          <Sider width="36%">
            <Menus />
          </Sider>
          <Layout>
            <Content className="content">
              <h1 style={{ marginLeft: 20, fontSize: 40 }}>Профиль</h1>
            </Content>
          </Layout>
        </Layout>
      </Flex>
    </>
  );
}
