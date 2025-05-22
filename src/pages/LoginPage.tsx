import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Form, Input, Flex } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { tokenService } from "../services/token.service";
import { postDataSigninUser } from "../api/auth";
import React, { useMemo, useState } from "react";
import { Button, Divider, notification, Space } from "antd";
import { useDispatch } from "react-redux";
import { authActions } from "../store/isAuthSlice";

const Context = React.createContext({ name: "Default" });

export default function Login(): JSX.Element {
  const dispatch = useDispatch();
  const [isError, setIsError] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (message: any) => {
    const placement = "topRight";
    api.info({
      message: `Ошибка: ${message}`,
      placement,
    });
  };

  const contextValue = useMemo(() => ({ name: "Ant Design" }), []);
  const navigate = useNavigate();
  async function onFinish(values: any) {
    const dataSigninUser = { login: values.login, password: values.password };
    try {
      const responseData = await postDataSigninUser(dataSigninUser);

      if (responseData !== null) {
        dispatch(authActions.login());
        tokenService.accessToken = responseData?.accessToken;
        navigate("/profile");
      }
    } catch (error: any) {
      console.log(error);
      setIsError(true);
      openNotification(error.message);
    }
  }

  return (
    <>
      <Form
        name="login"
        initialValues={{ remember: true }}
        style={{ maxWidth: 360 }}
        onFinish={onFinish}
      >
        <Form.Item
          name="login"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Log in
          </Button>
          or <Link to="/signup">Register now!</Link>
        </Form.Item>
      </Form>
      {isError && (
        <Context.Provider value={contextValue}>
          {contextHolder}
          <Divider />
        </Context.Provider>
      )}
    </>
  );
}
