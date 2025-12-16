import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Roles } from "../components/users/assignRolesModals/AssignRolesModal";

type RequiredRoles = Exclude<Roles, Roles.USER>

export default function ProtectedRoute({children,requiredRoles,}: {children: JSX.Element;requiredRoles:RequiredRoles[] })
 {
  console.log("Протектер роутер рендер");
  const user = useSelector((state) => state.userData.userData);

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  const hasAccess = user.roles.some((role:RequiredRoles) => requiredRoles.includes(role));
  if (!hasAccess) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}
