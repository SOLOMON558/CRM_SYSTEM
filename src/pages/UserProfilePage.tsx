import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { editProfileUser, getUserProfileById } from "../api/users";
export function UserProfilePage() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [userData, setUserData] = useState({});
  const params = useParams();
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    async function userProfile(id) {
      const response = await getUserProfileById(id);
      setUserData(response);
    }
    userProfile(params.id);
  }, []);

  function startEditing() {
    setIsEdit(true);
  }
  async function handleEditUserData(values) {
    const data = {
      email: values.email === userData.email ? "" : values.email,
      phoneNumber: values.phone === userData.phoneNumber ? "" : values.phone,
      username: values.name === userData.username ? "" : values.name,
    };
    try {
      const response = await editProfileUser(params.id, data);
      console.log("Данные обновлены", response);
      setUserData(response.data);
      setIsEdit(false);
    } catch (error) {
      console.log("Ошибка обновления данных", error);
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
            name="basic"
            onFinish={handleEditUserData}
            style={{
              display: "inline-flex",
              flexDirection: "column", // элементы — в столбик
              gap: "8px", // отступ между элементами
              width: "fit-content",
            }}
            initialValues={{
              name: userData.username,
              email: userData.email,
              phone: userData.phoneNumber,
            }}
          >
            Имя пользователя
            <Form.Item
              name="name"
              rules={[
                { min: 2, message: "Минимум 2 символа!" },
                { max: 64, message: "Максимум 64 символа!" },
              ]}
            >
              <Input type="text" />
            </Form.Item>
            Email пользователя
            <Form.Item
              name="email"
              rules={[
                { min: 2, message: "Минимум 2 символа!" },
                { max: 64, message: "Максимум 64 символа!" },
              ]}
            >
              <Input type="text" />
            </Form.Item>
            Телефон пользователя
            <Form.Item
              name="phone"
              rules={[
                { min: 2, message: "Минимум 2 символа!" },
                { max: 64, message: "Максимум 64 символа!" },
              ]}
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Сохранить
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                onClick={() => setIsEdit(false)}
              >
                Отмена
              </Button>
            </Form.Item>
          </Form>
        </>
      )}
    </>
  );
}
