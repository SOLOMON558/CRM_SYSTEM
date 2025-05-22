import { Button, Table, TableProps } from "antd";
import { modalActions } from "../../store/isOpenModal";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { fetchUsers, usersActions } from "../../store/users";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

export function TableWithUsers({ normalizedDataProfiles }) {
  const isAdmin = useSelector((state: any) => state.stuff.isAdmin);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const sortByStore = useSelector((state) => state.users.sortBy);
  const sortOrderStore = useSelector((state) => state.users.sortOrder);
  const sortBlockedStore = useSelector((state) => state.users.isBlocked);

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

  async function handleSortByBlocked(status) {
    let isBlocked = "";

    if (status === "unBlocked") {
      isBlocked = "false";
    }
    if (status === "blocked") {
      isBlocked = "true";
    }
    dispatch(usersActions.setSortBy(""));
    dispatch(usersActions.setSortOrder(""));
    dispatch(usersActions.setBlocked(isBlocked));
    console.log(dispatch(usersActions.setBlocked(isBlocked)));
    dispatch(fetchUsers());
  }

  async function handleSortByUserName(sortBy, sortOrder) {
    console.log(sortBy, sortOrder, "в хандле");
    dispatch(usersActions.setSortBy(sortBy));
    dispatch(usersActions.setSortOrder(sortOrder));
    dispatch(usersActions.setBlocked(""));

    try {
      dispatch(fetchUsers());
      console.log("Получилось отфильтровать по имени");
    } catch (error) {
      console.log("Не получилось отфильтровать по имени", error);
    }
  }

  const columns = [
    {
      title: (
        <>
          <Button
            style={{ color: sortByStore === "username" ? "blue" : "grey" }}
            onClick={() => handleSortByUserName("username", "asc")}
          >
            "Имя"
          </Button>{" "}
          <UpOutlined
            style={{
              color:
                sortByStore === "username" && sortOrderStore === "asc"
                  ? "blue"
                  : "grey",
            }}
            onClick={() => handleSortByUserName("username", "asc")}
          />{" "}
          <DownOutlined
            style={{
              color:
                sortByStore === "username" && sortOrderStore === "desc"
                  ? "blue"
                  : "grey",
            }}
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
          <Button
            style={{ color: sortByStore === "email" ? "blue" : "grey" }}
            onClick={() => handleSortByUserName("email", "asc")}
          >
            "Email"
          </Button>{" "}
          <UpOutlined
            style={{
              color:
                sortByStore === "email" && sortOrderStore === "asc"
                  ? "blue"
                  : "grey",
            }}
            onClick={() => handleSortByUserName("email", "asc")}
          />{" "}
          <DownOutlined
            style={{
              color:
                sortByStore === "email" && sortOrderStore === "desc"
                  ? "blue"
                  : "grey",
            }}
            onClick={() => handleSortByUserName("email", "desc")}
          />
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
  return (
    <Table<DataType>
      columns={columns}
      dataSource={normalizedDataProfiles as any}
    />
  );
}
