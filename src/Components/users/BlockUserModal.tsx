import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { blockedUsersProfile, unBlockedUsersProfile } from "../../api/users";
import { fetchUsers } from "../../store/users";
import { User } from "../../types/users";

interface BlockModalProps {
  setCurrentModal: (value: string | null) => void;
  setCurrentUser: (user: User | null) => void;
  currentUser: User;
  currentModal: string | null;
}
export function BlockUserModal({
  currentModal,
  setCurrentModal,
  currentUser,
  setCurrentUser,
}:BlockModalProps) {
  const dispatch = useDispatch();

  const handleOkBlocked = async () => {
    console.log(currentUser.isBlocked);
    try {
      if (currentUser?.isBlocked === true) {
        console.log("Зашли в разблокировку");
        const response = await unBlockedUsersProfile(currentUser.id);
        console.log(`Успешно разблокирован`, response);
      }
      if (currentUser?.isBlocked === false) {
        console.log("Зашли в блокировку");
        const response = await blockedUsersProfile(currentUser.id);
        console.log(`Успешно блокирован`, response);
      }
      dispatch(fetchUsers());
      setCurrentModal(null);
    } catch (error) {
      console.log("Ошибка при блокировке/разблокировке", error);
    }
  };

  const handleCancelBlocked = () => {
    setCurrentModal(null);
    setCurrentUser(null);
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
        {currentUser?.isBlocked === true ? "Разблокировать" : "Заблокировать"}{" "}
        пользователя
      </p>
    </Modal>
  );
}
