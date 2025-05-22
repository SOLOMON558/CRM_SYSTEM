import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../../store/isOpenModal";
import { fetchUsers } from "../../../store/users";
import { useEffect, useState } from "react";
import { editRoleUser } from "../../../api/users";

export function ConfirmRoles({ status, addRole, id, roles, isOpen}) {
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
    try {
      const response = await editRoleUser(id, roles.split(", "));
      dispatch(modalActions.closeModal());
      console.log("Удалось обновить роли", response);
      dispatch(modalActions.closeModal());
      dispatch(modalActions.setCurrentUser(null));
      dispatch(
        fetchUsers({
          sortBy: sortByStore,
          sortOrder: sortOrderStore,
          isBlocked: sortBlockedStore,
        })
      );
    } catch (error) {
      console.log("Не удалось обновить роли");
    }
  };

  const handleCancelConfirm = () => {
    setIsOpenConfirm(true);
    dispatch(modalActions.closeModal());
    dispatch(modalActions.setCurrentUser(null));
  };

  return (
    <Modal
      title="Basic Modal"
      closable={{ "aria-label": "Custom Close Button" }}
      open={isOpenConfirm}
      onOk={handleOkConfirm}
      onCancel={handleCancelConfirm}
    >
      {addRole?.map((item) => (
        <p>
          Вы уверены, что хотите{" "}
          {status
            ? `Забрать ${item} у пользователя`
            : `Выдать ${item} пользователю`}
        </p>
      ))}
    </Modal>
  );
}
