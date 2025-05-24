import { useEffect, useState } from "react";
import { Input, Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, usersActions } from "../store/users";
import { useLocation, useNavigate } from "react-router";
import { AssignRolesModal } from "../Components/users/assignRolesModals/AssignRolesModal";
import { DeleteUserModal } from "../Components/users/DeleteUserModal";
import { BlockUserModal } from "../Components/users/BlockUserModal";
import { TableWithUsers } from "../Components/users/TableWithUsers";

function UsersPage() {
  const { Search } = Input;
  const [currentUser, setCurrentUser] = useState();
  const [currentModal, setCurrentModal] = useState();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.list);
  const status = useSelector((state) => state.users.status);
  const error = useSelector((state) => state.users.error);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    function getUsersData() {
      console.log("ЗАПРОС ДЛЯ ЮЗЕРОВ 1");
      dispatch(fetchUsers());
    }
    getUsersData();
  }, [location.pathname]);

  useEffect(() => {
    async function usersDataProfiles() {
      if (status === "failed") {
        console.log("Ошибка/не админ", error);
        navigate("/profile");
      }
      if (status === "succeeded") {
        console.log("Запрос пришел");
        if (users) {
          console.log(users);
        }
      }
    }
    usersDataProfiles();
  }, [status]);

  async function handleSearchUser(values) {
    if (values) {
      const search = values.search;
      dispatch(usersActions.setSearch(search));
      try {
        dispatch(fetchUsers());
        console.log("Получилось найти");
      } catch (error) {
        console.log("Не получилось найти", error);
      }
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
            <Search
              placeholder="Поиск"
              onSearch={handleSearchUser}
              style={{ width: 200 }}
            />
          </div>
        </Form.Item>
      </Form>
      {currentUser && (
        <>
          {currentModal === "block" && (
            <BlockUserModal
              currentModal={currentModal}
              setCurrentModal={setCurrentModal}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          )}
          {currentModal === "delete" && (
            <DeleteUserModal
              currentModal={currentModal}
              setCurrentModal={setCurrentModal}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          )}
          {currentModal === "roles" && (
            <AssignRolesModal
              currentModal={currentModal}
              setCurrentModal={setCurrentModal}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          )}
        </>
      )}
      <TableWithUsers
        currentModal={currentModal}
        setCurrentModal={setCurrentModal}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        normalizedDataProfiles={users.data}
      />
      ;
    </>
  );
}

export default UsersPage;
//283
// 437 строк кода было
