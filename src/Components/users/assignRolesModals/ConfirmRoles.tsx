import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../../store/users";
import { useEffect, useState } from "react";
import { editRoleUser } from "../../../api/users";
import { Roles } from "./AssignRolesModal";
import { User } from "../../../types/users";

interface ConfirmRolesProps {
  setCurrentModal: (value: string | null) => void;
  setCurrentUser: (user: User | null) => void;
  addRole: Roles[];
  id: number;
  roles: Roles[];
  isOpen: boolean;
}
export function ConfirmRoles({
  setCurrentModal,
  setCurrentUser,
  addRole,
  id,
  roles,
  isOpen,
}: ConfirmRolesProps) {
  console.log(addRole);
  const [isOpenConfirm, setIsOpenConfirm] = useState<boolean>(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setIsOpenConfirm(isOpen);
  }, [isOpen]);
  
  const handleOkConfirm = async () => {
    console.log("Роли в конфирме", roles);
    try {
      const response = await editRoleUser(id, roles);
      setCurrentModal(null);
      setCurrentUser(null);
      dispatch(fetchUsers());
      console.log("Удалось обновить роли", response);
    } catch (error) {
      console.log("Не удалось обновить роли", error);
    }
  };

  const handleCancelConfirm = () => {
    setIsOpenConfirm(true);
    setCurrentModal(null);
    setCurrentUser(null);
  };

  return (
    <Modal
      title="Подтвердите действие"
      closable={{ "aria-label": "Custom Close Button" }}
      open={isOpenConfirm}
      onOk={handleOkConfirm}
      onCancel={handleCancelConfirm}
    >
      <h2>Вы уверены, что хотите изменить роли на: </h2>
      {addRole?.map((item) => (
        <>
          <li>{item}</li>
        </>
      ))}
    </Modal>
  );
}
