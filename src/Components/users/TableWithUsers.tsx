import { Button, Table, TableProps } from "antd";
import { modalActions } from "../../store/isOpenModal";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useState } from "react";
import { fetchUsers, usersActions } from "../../store/users";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

export function TableWithUsers({normalizedDataProfiles}) {
  const isAdmin = useSelector((state: any) => state.stuff.isAdmin);
  const navigate = useNavigate();
  const [blocked, setBlocked] = useState(false);
  const dispatch = useDispatch();

  interface DataType {
    key: string;
    name: string;
    email: string;
    phone: number;
    tags: string[];
    status: boolean;
  }
  const showModalBlocked = (user) => {
    dispatch(modalActions.setCurrentUser(user));
    dispatch(modalActions.openModal("block"));
  };

  const showModalDelete = (user) => {
    dispatch(modalActions.setCurrentUser(user));
    dispatch(modalActions.openModal("delete"));
  };

  const showModalRoles = (user) => {
    dispatch(modalActions.setCurrentUser(user));
    dispatch(modalActions.openModal("roles"));
  };

  async function handleSortByBlocked() {
    setBlocked(!blocked);
    const isBlocked = blocked;
    await dispatch(fetchUsers({ isBlocked }));
  }
  async function handleSortByUserName(sortBy, sortOrder) {
    console.log(sortBy, sortOrder, "в хандле");
    try {
      await dispatch(fetchUsers({ sortBy, sortOrder }));
      console.log("Получилось отфильтровать по имени");
    } catch (error) {
      console.log("Не получилось отфильтровать по имени", error);
    }
  }

    const columns = [
    {
      title: (
        <>
          <Button onClick={() => handleSortByUserName("username", "asc")}>
            "Имя"
          </Button>{" "}
          <UpOutlined onClick={() => handleSortByUserName("username", "asc")} />{" "}
          <DownOutlined
            onClick={() => handleSortByUserName("username", "desc")}
          />
        </>
      ),

      dataIndex: "name",
      key: "name",
    },
    {
      title: (
        <>
          <Button onClick={() => handleSortByUserName("email", "asc")}>
            "Email"
          </Button>{" "}
          <UpOutlined onClick={() => handleSortByUserName("email", "asc")} />{" "}
          <DownOutlined onClick={() => handleSortByUserName("email", "desc")} />
        </>
      ),
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Телефон",
      dataIndex: "phone",
      key: "phone",
    },

    {
      title: "Дата регистрации",
      dataIndex: "data",
      key: "data",
    },
    {
      title: "Статус",
      dataIndex: "roles",
      key: "roles",
    },
    {
      title: isAdmin ? (
        <Button onClick={handleSortByBlocked}>"isBlocked"</Button>
      ) : (
        "isBlocked"
      ),
      render: (text, record) => (
        <Button type="primary" onClick={() => showModalBlocked(record)}>
          {record.isBlocked}
        </Button>
      ),

      key: "status",
    },
    ...(isAdmin
      ? [
          {
            title: "",
            render: (text, record) => (
              <Button type="primary" onClick={() => showModalRoles(record)}>
                Выдать права
              </Button>
            ),
            key: "edit",
          },
        ]
      : []),
    ...(isAdmin
      ? [
          {
            title: "",
            render: (text, record) => (
              <Button
                type="primary"
                onClick={() => showModalDelete(record)}
                color="red"
                variant="solid"
              >
                Удалить
              </Button>
            ),
            key: "delete",
          },
        ]
      : []),
    {
      title: "",
      render: (text, record) => (
        <Button
          type="primary"
          onClick={() => {
            dispatch(
              usersActions.selectUserProfile({
                name: record.name,
                email: record.email,
                phone: record.phone,
              })
            );
            navigate(`/users/${record.id}`);
          }}
        >
          Профиль
        </Button>
      ),
      key: "profile",
    },
  ];
  return(
    <Table<DataType>
        columns={columns}
        dataSource={normalizedDataProfiles as any}
      />
  )
}
