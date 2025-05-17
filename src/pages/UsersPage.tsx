import { useEffect, useState } from "react";
import {  Input, Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store/users";
import { useLocation, useNavigate, useNavigationType } from "react-router";
import {  MonitorOutlined} from "@ant-design/icons";
import { AssignRolesModal } from "../Components/users/AssignRolesModal";
import { DeleteUserModal } from "../Components/users/DeleteUserModal";
import { BlockUserModal } from "../Components/users/BlockUserModal";
import { TableWithUsers } from "../Components/users/TableWithUsers";


function UsersPage() {
  console.log("Юзеры зарендерились")
  const user = useSelector((state) => state.modal.currentUser);
  const [normalizedDataProfiles, setNormalizedDataProfiles] = useState([]);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.list);
  const status = useSelector((state) => state.users.status);
  const navigationType = useNavigationType();
  const location = useLocation();
  const navigate = useNavigate()

  useEffect(() => {
    function getUsersData () {
      dispatch(fetchUsers());
    }
    getUsersData()
  }, [location.pathname]);

  useEffect(() => {
    async function usersDataProfiles() {
      if(status==="failed") {
        console.log("Ошибка/не админ")
        navigate("/profile")
      }
      if (status === "succeeded") {
        console.log("Запрос пришел");
        if (users) {
          console.log(users);
          setNormalizedDataProfiles(
            users.data.map((item) => ({
              key: item.id,
              id: item.id,
              name: item.username,
              email: item.email,
              phone: item.phoneNumber,
              data: new Date(item.date).toLocaleDateString(),
              isBlocked: item.isBlocked ? "true" : "false",
              roles: (item.roles || []).join(", "),
            }))
          );
        }
      }
    }
    usersDataProfiles();
  }, [status]);

  async function handleSearchUser(values) {
    const search = values.search;
    try {
      await dispatch(fetchUsers({ search }));
      console.log("Получилось найти");
    } catch (error) {
      console.log("Не получилось найти", error);
    }
  }

  return (
    <>
      <Form form={form} name="basic" onFinish={handleSearchUser}>
        <Form.Item name="search">
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              margin: 16,
            }}
          >
            {" "}
            <MonitorOutlined />
            <Input type="text" placeholder="Поиск" style={{ width: 200 }} />
          </div>
        </Form.Item>
      </Form>
      {user && (
        <>
          <BlockUserModal />
          <DeleteUserModal />
          <AssignRolesModal />{" "}
        </>
      )}
      <TableWithUsers normalizedDataProfiles={normalizedDataProfiles} />;
    </>
  );
}

export default UsersPage;
//283
// 437 строк кода было
