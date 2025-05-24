import { Button, Form, Input, Select } from "antd";
import { UserRegistration } from "../types/auth";
import {  useNavigate } from "react-router-dom";
import { postDataSignupUser } from "../api/auth";
import { emailRule, emailRules, passwordRule, passwordRules, phoneRule, userNameRule } from "../services/validationRules";

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

export default function Registration(): JSX.Element {
  const [form] = Form.useForm();
  const navigate = useNavigate()
  async function onFinish(values: UserRegistration) {
    let phoneNumber;
    if (values.phone) {
      phoneNumber = values.prefix + values.phone;
    } else {
      phoneNumber = "";
    }
    const dataSignupUser = {
      login: values.login,
      username: values.username,
      password: values.password,
      email: values.email,
      phoneNumber: phoneNumber,
    };
    if (await postDataSignupUser(dataSignupUser)==="Успешная регистрация"){
      navigate("/signin")
    };
    
  }

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="+7">+7</Option>
      </Select>
    </Form.Item>
  );

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      onFinishFailed={(errorInfo) => {
        console.log("Ошибки при отправкефо формы", errorInfo);
      }}
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
          { required: true, message: "Логин не может быть пустым" },
          { min: 2, message: "Введите более 1 символа" },
          { max: 60, message: "Введите менее 60 символов" },
          {
            pattern: /^[A-Za-z]+$/,
            message: "Логин состоит только из латинских букв",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="username"
        label="UserName"
        rules={userNameRule}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={passwordRule}
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
            message: "Повторите пароль",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Пароли не совпадают"));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="email"
        label="E-mail"
        rules={emailRule}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Phone Number"
        rules={phoneRule}
      >
        <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
}

