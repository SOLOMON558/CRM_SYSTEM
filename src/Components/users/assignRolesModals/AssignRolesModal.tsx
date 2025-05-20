import { Button, Modal } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editRoleUser } from "../../../api/users";
import { fetchUsers } from "../../../store/users";
import { modalActions } from "../../../store/isOpenModal";
import { ConfirmRoles } from "./ConfirmRoles";

export function AssignRolesModal() {
  const currentUser = useSelector((state) => state.modal.currentUser);
  const currentModal = useSelector((state) => state.modal.activeModal);
  const [statusRole, setStatusRole] = useState();
  const [getRole, setGetRole] = useState([]);
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const dispatch = useDispatch();
  console.log(currentUser);

  function handleGiveRoles(role, status) {
    setStatusRole(status);
    setGetRole((prev) => (prev.includes(role) ? prev : [...prev, role]));
    console.log(getRole);
    if (!status && currentUser) {
      const updateRole = currentUser.roles + ", " + role;
      dispatch(
        modalActions.setCurrentUser({ ...currentUser, roles: updateRole })
      );
    }
    if (status && currentUser) {
      let updateRole = "";
      if (role === "MODERATOR" || role === "ADMIN") {
        updateRole = currentUser.roles.replace(`, ${role}`, "");
      }
      if (role === "USER") {
        updateRole = currentUser.roles.replace(`${role}, `, "");
      }
      dispatch(
        modalActions.setCurrentUser({ ...currentUser, roles: updateRole })
      );
    }
  }

  const handleOkRoles = async () => {
    setIsOpenConfirm(true);

    // try {
    //   const response = await editRoleUser(
    //     currentUser.id,
    //     currentUser.roles.split(", ")
    //   );
    //   dispatch(modalActions.closeModal());
    //   console.log("Удалось обновить роли", response);
    //   dispatch(fetchUsers());
    // } catch (error) {
    //   console.log("Не удалось обновить роли");
    // }
  };

  const handleCancelRoles = () => {
    setGetRole([]);
    dispatch(modalActions.closeModal());
    dispatch(modalActions.setCurrentUser(null));
  };

  return (
    <>
      <ConfirmRoles
        status={statusRole}
        addRole={getRole}
        id={currentUser.id}
        roles={currentUser.roles}
        isOpen={isOpenConfirm}
      />
      <Modal
        title="Basic Modal"
        open={currentModal === "roles"}
        onOk={handleOkRoles}
        onCancel={handleCancelRoles}
      >
        {currentUser && (
          <>
            <ul>
              Выдать роль:
              <li>
                <Button
                  onClick={() =>
                    handleGiveRoles(
                      "ADMIN",
                      currentUser.roles.includes("ADMIN")
                    )
                  }
                  type={
                    currentUser.roles.includes("ADMIN") ? "primary" : "default"
                  }
                >
                  ADMIN
                </Button>
              </li>
              <li>
                <Button
                  onClick={() =>
                    handleGiveRoles(
                      "MODERATOR",
                      currentUser.roles.includes("MODERATOR")
                    )
                  }
                  type={
                    currentUser.roles.includes("MODERATOR")
                      ? "primary"
                      : "default"
                  }
                >
                  MODERATOR
                </Button>
              </li>
              <li>
                <Button
                  onClick={() =>
                    handleGiveRoles("USER", currentUser.roles.includes("USER"))
                  }
                  type={
                    currentUser.roles.includes("USER") ? "primary" : "default"
                  }
                >
                  USER
                </Button>
              </li>
            </ul>
          </>
        )}
      </Modal>
    </>
  );
}
