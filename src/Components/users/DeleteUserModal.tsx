import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../store/isOpenModal";
import { deleteUsersProfile } from "../../api/users";
import { fetchUsers } from "../../store/users";

export function DeleteUserModal({currentModal, setCurrentModal, currentUser, setCurrentUser}) {
  
  const dispatch = useDispatch();

  const handleOkDelete = async () => {
    try {
      console.log(currentUser);
      const response = await deleteUsersProfile(currentUser.id);
      console.log("Успешно удален", response);
      dispatch(fetchUsers());
      setCurrentModal(null)
    } catch (error) {
      console.log("Ошибка при удалении", error);
    }
  };
  const handleCancelDelete = () => {
    setCurrentModal(null)
    setCurrentUser(null)
  };

  return (
    <Modal
      title="Basic Modal"
      closable={{ "aria-label": "Custom Close Button" }}
      open={currentModal === "delete"}
      onOk={handleOkDelete}
      onCancel={handleCancelDelete}
    >
      <p>Вы уверены, что хотите удалить пользователя?</p>
    </Modal>
  );
}
