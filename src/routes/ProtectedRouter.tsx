import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Spin } from "antd";

export default function ProtectedRoute({ children, requiredRoles }: {
  children: JSX.Element;
  requiredRoles: string[];
}) {
  console.log("Протектер роутер рендер")
  const user = useSelector((state) => state.userData.userData);
  const status = useSelector((state) => state.userData.status);

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  const hasAccess = user.roles.some(role => requiredRoles.includes(role));
  if (!hasAccess) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}