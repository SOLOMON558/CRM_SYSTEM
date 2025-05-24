import { Button, Modal } from "antd";
import { useState } from "react";
import { ConfirmRoles } from "./ConfirmRoles";

export enum Roles {
  ADMIN = "ADMIN",
  MODERATOR = "MODERATOR",
  USER = "USER",
}

export function AssignRolesModal({
  currentModal,
  setCurrentModal,
  currentUser,
  setCurrentUser,
}) {
  const [statusRole, setStatusRole] = useState<boolean | null>(null);
  const [getRole, setGetRole] = useState<Roles[]>([]);
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);

  function handleGiveRoles(role: Roles, status: boolean) {
    setStatusRole(status);
    console.log(getRole);
    if (!status && currentUser) {
      let updateRole = [];
      updateRole = [...currentUser.roles, role];
      setCurrentUser({ ...currentUser, roles: updateRole });
    }
    if (status && currentUser) {
      let updateRole = [];
      updateRole = currentUser.roles.filter((item) => item !== role);
      setCurrentUser({ ...currentUser, roles: updateRole });
    }
  }

  const handleOkRoles = async () => {
    let finalRole = currentUser.roles;
    setGetRole([...finalRole]);
    setIsOpenConfirm(true);
  };

  const handleCancelRoles = () => {
    setGetRole([]);
    setCurrentModal(null);
    setCurrentUser(null);
  };

  return (
    <>
      <ConfirmRoles
        currentModal={currentModal}
        setCurrentModal={setCurrentModal}
        setCurrentUser={setCurrentUser}
        currentUser={currentUser}
        status={statusRole}
        addRole={getRole}
        id={currentUser?.id}
        roles={currentUser?.roles}
        isOpen={isOpenConfirm}
      />
      <Modal
        title="Выберите роли"
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
