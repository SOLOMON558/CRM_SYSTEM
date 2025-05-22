import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

type MenuItem = Required<MenuProps>["items"][number];

const itemsUser: MenuItem[] = [
  { key: "1", label: "TODO-LIST" },
  { key: "2", label: "PROFILE" },
];
const itemsAdmin: MenuItem[] = [
  { key: "1", label: "TODO-LIST" },
  { key: "2", label: "PROFILE" },
  { key: "3", label: "USERS" },
];

export default function MainNavigation(): JSX.Element {
  const isAdmin = useSelector((state: any) => state.stuff.isAdmin);
  const isModer = useSelector((state: any) => state.stuff.isModer);
  const navigate = useNavigate();
  const onClick: MenuProps["onClick"] = (e) => {
    if (e.key === "1") {
      navigate("/todo");
    }
    if (e.key === "2") {
      navigate("/profile");
    }
    if (e.key === "3") {
      navigate("/users");
    }
  };

  return (
    <Menu
      onClick={onClick}
      style={{ width: 150, height: 600 }}
      defaultOpenKeys={["sub1"]}
      mode="inline"
      items={isAdmin || isModer ? itemsAdmin : itemsUser}
    />
  );
}
