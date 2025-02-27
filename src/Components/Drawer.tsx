import { useState } from "react";
import type { DrawerProps } from "antd";
import { Button, Drawer, Radio, Space } from "antd";
import { NavLink } from "react-router-dom";

export default function Drawers() {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<DrawerProps["placement"]>("left");

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Space>
        <Radio.Group value="left" />
        <Button type="primary" onClick={showDrawer}>
          Открыть меню
        </Button>
      </Space>
      <Drawer
        title="Меню"
        placement={placement}
        closable={false}
        onClose={onClose}
        open={open}
        key={placement}
      >
        <p>
          <Button>
            <NavLink to="/todo">Список задач </NavLink>
          </Button>
        </p>
        <p>
          <Button>
            <NavLink to="/profile">Профиль</NavLink>
          </Button>
        </p>
      </Drawer>
    </>
  );
}
