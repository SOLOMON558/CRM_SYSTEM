import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../store/isOpenModal";
import { blockedUsersProfile, unBlockedUsersProfile } from "../../api/users";
import { fetchUsers } from "../../store/users";

export function BlockUserModal() {
  const currentUser = useSelector((state) => state.modal.currentUser);
  const currentModal = useSelector((state) => state.modal.activeModal);
  const sortByStore = useSelector((state) => state.users.sortBy);
  const sortOrderStore = useSelector((state) => state.users.sortOrder);
  const sortBlockedStore = useSelector((state) => state.users.isBlocked);
  const dispatch = useDispatch();

  const handleOkBlocked = async () => {
    try {
      if (currentUser?.isBlocked === "true") {
        const response = await unBlockedUsersProfile(currentUser.id);
        console.log(`Успешно разблокирован`, response);
      }
      if (currentUser?.isBlocked === "false") {
        const response = await blockedUsersProfile(currentUser.id);
        console.log(`Успешно блокирован`, response);
      }
      dispatch(fetchUsers());
      dispatch(modalActions.closeModal());
    } catch (error) {
      console.log("Ошибка при блокировке/разблокировке", error);
    }
  };

  const handleCancelBlocked = () => {
    dispatch(modalActions.closeModal());
    dispatch(modalActions.setCurrentUser(null));
  };

  return (
    <Modal
      title="Basic Modal"
      closable={{ "aria-label": "Custom Close Button" }}
      open={currentModal === "block"}
      onOk={handleOkBlocked}
      onCancel={handleCancelBlocked}
    >
      <p>
        Вы уверены, что хотите{" "}
        {currentUser?.isBlocked === "true" ? "Разблокировать" : "Заблокировать"}{" "}
        пользователя
      </p>
    </Modal>
  );
}
