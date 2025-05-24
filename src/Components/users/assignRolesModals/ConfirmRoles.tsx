import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../../store/isOpenModal";
import { fetchUsers } from "../../../store/users";
import { useEffect, useState } from "react";
import { editRoleUser } from "../../../api/users";

export function ConfirmRoles({
  setCurrentModal,
  setCurrentUser,
  status,
  addRole,
  id,
  roles,
  isOpen,
}) {
  console.log(addRole);
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const dispatch = useDispatch();
  const sortByStore = useSelector((state) => state.users.sortBy);
  const sortOrderStore = useSelector((state) => state.users.sortOrder);
  const sortBlockedStore = useSelector((state) => state.users.isBlocked);
  useEffect(() => {
    setIsOpenConfirm(isOpen);
  }, [isOpen]);
  const handleOkConfirm = async () => {
    console.log("Роли в конфирме", roles);
    try {
      const response = await editRoleUser(id, roles);
      setCurrentModal(null);
      setCurrentUser(null);
      dispatch(
        fetchUsers({
          sortBy: sortByStore,
          sortOrder: sortOrderStore,
          isBlocked: sortBlockedStore,
        })
      );
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
