import React, { useEffect, useState } from "react";
import { LockOutlined, LogoutOutlined } from "@ant-design/icons";
import { Button, Form, Input, Flex } from "antd";
import "@ant-design/v5-patch-for-react-19";

import { Select } from "antd";
import { getDataUser, postDataUser, postDataUserSingin } from "../api/apiTasks";
import { useNavigate } from "react-router";

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export default function Autorization() {

  const navigate = useNavigate();

  useEffect(()=> {
    const accessToken = localStorage.getItem("accessToken")
    console.log(accessToken)
   
    async function checkAccessToken(accessToken:string | null) {
      if (accessToken){
      const result = await getDataUser(accessToken)
      if (result) {
      try {
      if (result.status ===200) {
        navigate("/profile")
      }}
      catch {
        console.log("Ошибка переноса на профиль")
      }
    }}}
    checkAccessToken(accessToken)

  },[])

  async function onFinishSingin(values: { login: string; password: string }) {
    const data = {
      login: values.login,
      password: values.password,
    };
    const userTokens = await postDataUserSingin(data);
    console.log(userTokens.status);
    if (userTokens.status === 200) {
      await localStorage.setItem("accessToken", userTokens.data.accessToken);
      await localStorage.setItem("refreshToken", userTokens.data.refreshToken);
      navigate("/todo");
    } else {
      alert("Неправильный логин или пароль");
    }
  }

  async function onFinishRegistation(values: {
    login: string;
    username: string;
    password: string;
    email: string;
    phoneNumber: string;
    prefix: string;
  }) {
    const fullPhone = `${(values.prefix) ? values.prefix: "" }${(values.phoneNumber) ?values.phoneNumber: ""}`;
    const data = {
      login: values.login,
      username: values.username,
      password: values.password,
      email: values.email,
      phoneNumber: fullPhone || "",
    };
    try {
      const result = await postDataUser(data);
      if (result?.status === 201) {
        alert("Регистрация успешна, авторизуйтесь");
        setIsRegistering(!isRegistering);
      }
    } catch {
      console.log("Ошибка с сервером при регистрации");
    }
  }

  const [form2] = Form.useForm();
  const [isRegistering, setIsRegistering] = useState(false);
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="+7">+7</Option>
      </Select>
    </Form.Item>
  );

  function handleRegistering() {
    setIsRegistering(true);
  }

  return (
    <>
      {!isRegistering ? (
        <Flex justify="center" align="center" style={{ height: "100vh" }}>
          <Form
            name="logins"
            initialValues={{ remember: true }}
            style={{ maxWidth: 360 }}
            onFinish={onFinishSingin}
          >
            <Form.Item
              name="login"
              rules={[
                { min: 2, message: "Минимум 2 символа!" },
                { max: 60, message: "Максимум 60 символов!" },
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input placeholder="Login" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { min: 6, message: "Минимум 6 символов!" },
                { max: 60, message: "Максимум 60 символов!" },
                { required: true, message: "Please input your Password!" },
              ]}
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
              or <Button onClick={handleRegistering}>Register now!</Button>
            </Form.Item>
          </Form>
        </Flex>
      ) : (
        <Flex justify="center" align="center" style={{ height: "100vh" }}>
          <Form
            {...formItemLayout}
            form={form2}
            name="register"
            onFinish={onFinishRegistation}
            initialValues={{
              prefix: "+7",
            }}
            style={{ maxWidth: 600 }}
            scrollToFirstError
          >
            <Form.Item
              name="login"
              label="Login"
              rules={[
                {pattern: /^[a-zA-Z]+$/, message: "Только латинские буквы!"},
                { min: 2, message: "Минимум 2 символа!" },
                { max: 60, message: "Максимум 60 символов!" },
                {
                  required: true,
                  message: "Please input your login!",
                },
              ]}
              hasFeedback
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="username"
              label="Username"
              rules={[
                {pattern: /^[a-zA-Zа-яА-ЯёЁ]+$/, message: "Только латиница и киррилица"},
                { min: 1, message: "Минимум 6 символов!" },
                { max: 60, message: "Максимум 60 символов!" },
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
              hasFeedback
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                { min: 6, message: "Минимум 6 символов!" },
                { max: 60, message: "Максимум 60 символов!" },
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The new password that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="phoneNumber"
              label="Phone Number"
              rules={[
                { pattern: /^[0-9]{10}$/, message: "Введите 10 цифр без пробелов и символов!" },
              ]}
            >
              <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Form>
        </Flex>
      )}
    </>
  );
}
