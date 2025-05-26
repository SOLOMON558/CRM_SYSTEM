import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { editProfileUser, getUserProfileById } from "../api/users";
import { emailRule, phoneRule, userNameRule } from "../services/validationRules";
interface UserData {
  id?: number;
  username: string;
  email: string;
  phoneNumber?: string;
}

interface FormValues {
  username: string;
  email: string;
  phone: string;
}

export function UserProfilePage() {
  const navigate = useNavigate();
  const [form] = Form.useForm<FormValues>();
  const [userData, setUserData] = useState<UserData>({
    username: "",
    email: "",
    phoneNumber: "",
  });
  const params = useParams<{ id: string }>();
  const [isEdit, setIsEdit] = useState<boolean>(false);

  useEffect(() => {
    async function userProfile(id: string | undefined) {
      if (!id) return;
      try {
        const response = await getUserProfileById(Number(id));
        setUserData(response);
        form.setFieldsValue({
          username: response.username,
          email: response.email,
          phone: response.phoneNumber ?? "",
        });
      } catch (error) {
        console.error("Ошибка получения данных пользователя", error);
      }
    }
    userProfile(params.id);
  }, [params.id, form]);

  function startEditing() {
    setIsEdit(true);
  }

  async function handleEditUserData(values: FormValues) {
    const data = {
      email: values.email === userData.email ? "" : values.email,
      phoneNumber:
        values.phone === (userData.phoneNumber ?? "") ? "" : values.phone,
      username: values.username === userData.username ? "" : values.username,
    };

    try {
      const response = await editProfileUser(Number(params.id), data);
      console.log("Данные обновлены", response);
      setUserData(response.data);
      setIsEdit(false);
    } catch (error) {
      console.error("Ошибка обновления данных", error);
    }
  }

  return (
    <>
      <h1>Профиль {params.id}</h1>
      <Button onClick={() => navigate(-1)}>Назад</Button>
      {!isEdit ? (
        <>
          <p>Имя пользователя: {userData.username}</p>
          <p>Email пользователя: {userData.email}</p>
          <p>
            Телефон пользователя:{" "}
            {userData.phoneNumber ? userData.phoneNumber : "Отсутствует"}
          </p>
          <Button type="primary" onClick={startEditing}>
            Редактировать
          </Button>
        </>
      ) : (
        <>
          <Form
            form={form}
            name="user-edit-form"
            onFinish={handleEditUserData}
            style={{
              display: "inline-flex",
              flexDirection: "column",
              gap: "8px",
              width: "fit-content",
            }}
          >
            Имя пользователя
            <Form.Item name="username" rules={userNameRule}>
              <Input type="text" />
            </Form.Item>
            Email пользователя
            <Form.Item name="email" rules={emailRule}>
              <Input type="text" />
            </Form.Item>
            Телефон пользователя
            <Form.Item name="phone" rules={phoneRule}>
              <Input type="text" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Сохранить
              </Button>
              <Button type="default" onClick={() => setIsEdit(false)}>
                Отмена
              </Button>
            </Form.Item>
          </Form>
        </>
      )}
    </>
  );
}