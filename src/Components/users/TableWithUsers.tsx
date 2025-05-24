import { Button, Table, TableProps, Tag } from "antd";
import { modalActions } from "../../store/isOpenModal";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { fetchUsers, usersActions } from "../../store/users";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

export function TableWithUsers({
  setCurrentModal,
  setCurrentUser,
  normalizedDataProfiles,
}) {
  const isAdmin = useSelector((state: any) => state.stuff.isAdmin);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sortBlockedStore = useSelector((state) => state.users.isBlocked);
  const roleColors = {
    ADMIN: "red",
    USER: "blue",
    MODERATOR: "volcano",
  };
  interface DataType {
    key: string;
    name: string;
    email: string;
    phone: number;
    tags: string[];
    status: boolean;
  }
  const showModalBlocked = (user) => {
    setCurrentUser(user);
    setCurrentModal("block");
  };

  const showModalDelete = (user) => {
    setCurrentUser(user);
    setCurrentModal("delete");
  };

  const showModalRoles = (user) => {
    setCurrentUser(user);
    setCurrentModal("roles");
  };

  async function handleSortByBlocked(status) {
    let isBlocked = "";

    if (status === "unBlocked") {
      isBlocked = "false";
    }
    if (status === "blocked") {
      isBlocked = "true";
    }
    dispatch(usersActions.setBlocked(isBlocked));
    console.log(dispatch(usersActions.setBlocked(isBlocked)));
    dispatch(fetchUsers());
  }
  function handleTableChange(pagination, filters, sorter) {
    console.log("СОРТЕР", sorter);
    const sortField = sorter?.columnKey || "";
    const rawSortOrder = sorter?.order || "";
    const sortOrder =
      rawSortOrder === "ascend"
        ? "asc"
        : rawSortOrder === "descend"
        ? "desc"
        : "";
    console.log(sortField, sortOrder);
    dispatch(usersActions.setSortBy({ sortBy: sortField }));
    dispatch(usersActions.setSortOrder({ sortOrder: sortOrder }));
    dispatch(fetchUsers());
  }

  const columns = [
    {
      title: "Имя",
      dataIndex: "username",
      key: "username",
      sorter: (a, b) => a.username.localeCompare(b.username),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "Телефон",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },

    {
      title: "Дата регистрации",
      render: (text, record) => format(new Date(record.date), "dd.MM.yyyy"),
      key: "date",
    },
    {
      title: "Статус",
      render: (text, record) =>
        record.roles.map((item) => <Tag color={roleColors[item]}>{item}</Tag>),
      key: "roles",
    },
    {
      title: isAdmin ? (
        <>
          <Button
            type={sortBlockedStore === "" ? "primary" : "default"}
            onClick={() => handleSortByBlocked("all")}
          >
            Все
          </Button>
          <Button
            type={sortBlockedStore === "false" ? "primary" : "default"}
            onClick={() => handleSortByBlocked("unBlocked")}
          >
            Не заблокированные
          </Button>
          <Button
            type={sortBlockedStore === "true" ? "primary" : "default"}
            onClick={() => handleSortByBlocked("blocked")}
          >
            Заблокированные
          </Button>
        </>
      ) : (
        "isBlocked"
      ),
      render: (text, record) => (
        <Button type="primary" onClick={() => showModalBlocked(record)}>
          {record.isBlocked ? "Заблокирован" : "Не заблокирован"}
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
  return (
    <Table<DataType>
      columns={columns}
      dataSource={normalizedDataProfiles as any}
      onChange={handleTableChange}
    />
  );
}
