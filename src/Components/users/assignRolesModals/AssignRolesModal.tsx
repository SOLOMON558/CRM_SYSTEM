import { Button, Modal } from "antd";
import { useState } from "react";
import { ConfirmRoles } from "./ConfirmRoles";
import { User } from "../../../types/users";

export enum Roles {
  ADMIN = "ADMIN",
  MODERATOR = "MODERATOR",
  USER = "USER",
}
interface AssignRolesModalProps {
  currentModal: string | null;
  setCurrentModal: (value: string | null) => void;
  currentUser: User 
  setCurrentUser: (user: User | null) => void;
}

export function AssignRolesModal({
  currentModal,
  setCurrentModal,
  currentUser,
  setCurrentUser,
}: AssignRolesModalProps) {
  const [getRole, setGetRole] = useState<Roles[]>([]);
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);

  function handleGiveRoles(role: Roles, status: boolean) {
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
    let finalRole = currentUser?.roles;
    if (finalRole) {
      setGetRole([...finalRole]);
      setIsOpenConfirm(true);
    }
  };

  const handleCancelRoles = () => {
    setGetRole([]);
    setCurrentModal(null);
    setCurrentUser(null);
  };

  return (
    <>
      <ConfirmRoles
        setCurrentModal={setCurrentModal}
        setCurrentUser={setCurrentUser}
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
