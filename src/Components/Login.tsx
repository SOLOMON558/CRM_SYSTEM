import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Flex } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { tryLoginUser } from "../Api/helpersFunction";
import { useDispatch } from "react-redux";
import { accessTokenActions } from "../store/accessTokenSlice";
import { getUserData } from "../Api/apiAuth";
import { tokenService } from "../services/token.service";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function onFinish(values: any) {
    const dataSigninUser = { login: values.login, password: values.password };
    const responseData = await tryLoginUser(dataSigninUser);
    if (responseData !== null) {
      tokenService.setAccessToken(responseData.accessToken)
      //проверил, устанавливаем
      navigate("/profile");
    }

  }

  return (
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
  );
}
