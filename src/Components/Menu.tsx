import { MailOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";

import { useNavigate } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "sub1",
    label: "CRM_TODO",
    icon: <MailOutlined />,
    children: [
      {
        key: "g1",
        label: "ВЫБОР СТРАНИЦЫ",
        type: "group",
        children: [
          { key: "1", label: "TODO-LIST" },
          { key: "2", label: "PROFILE" },
        ],
      },
    ],
  },
];

export default function Menus(): JSX.Element {
  const navigate = useNavigate();
  const onClick: MenuProps["onClick"] = (e) => {
    if (e.key === "1") {
      navigate("/todo");
    }
    if (e.key === "2") {
      navigate("/profile");
    }
  };

  return (
    <Menu
      onClick={onClick}
      style={{ width: 256, height: 440 }}
      defaultOpenKeys={["sub1"]}
      mode="inline"
      items={items}
    />
  );
}
