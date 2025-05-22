import { Button, Modal } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { modalActions, RootState } from "../../../store/isOpenModal";
import { ConfirmRoles } from "./ConfirmRoles";

export enum Roles {
  ADMIN = "ADMIN",
  MODERATOR = "MODERATOR",
  USER = "USER",
}

export function AssignRolesModal() {
  const currentUser = useSelector(
    (state: RootState) => state.modal.currentUser
  );
  const currentModal = useSelector(
    (state: RootState) => state.modal.activeModal
  );
  const [statusRole, setStatusRole] = useState<boolean | null>(null);
  const [getRole, setGetRole] = useState<Roles[]>([]);
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const dispatch = useDispatch();

  function handleGiveRoles(role: Roles, status: boolean) {
    setStatusRole(status);
    setGetRole((prev) => (prev.includes(role) ? prev : [...prev, role]));
    console.log(getRole);
    if (!status && currentUser) {
      let updateRole = [];
      updateRole = [...currentUser.roles, role];
      dispatch(
        modalActions.setCurrentUser({ ...currentUser, roles: updateRole })
      );
    }
    if (status && currentUser) {
      let updateRole = [];
      updateRole = currentUser.roles.filter((item) => item !== role);
      dispatch(
        modalActions.setCurrentUser({ ...currentUser, roles: updateRole })
      );
    }
  }

  const handleOkRoles = async () => {
    setIsOpenConfirm(true);
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
        id={currentUser?.id}
        roles={currentUser?.roles}
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
                      Roles.ADMIN,
                      currentUser.roles.includes(Roles.ADMIN)
                    )
                  }
                  type={
                    currentUser.roles.includes(Roles.ADMIN)
                      ? "primary"
                      : "default"
                  }
                >
                  ADMIN
                </Button>
              </li>
              <li>
                <Button
                  onClick={() =>
                    handleGiveRoles(
                      Roles.MODERATOR,
                      currentUser.roles.includes(Roles.MODERATOR)
                    )
                  }
                  type={
                    currentUser.roles.includes(Roles.MODERATOR)
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
                    handleGiveRoles(
                      Roles.USER,
                      currentUser.roles.includes(Roles.USER)
                    )
                  }
                  type={
                    currentUser.roles.includes(Roles.USER)
                      ? "primary"
                      : "default"
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
