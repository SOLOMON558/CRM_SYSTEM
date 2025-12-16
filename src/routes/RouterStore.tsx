import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "../layout/Root";
import Error from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import Todo from "../pages/TodoPage";
import Login from "../pages/LoginPage";
import Registration from "../pages/RegistrationPage";
import {
  checkAuthLoader,
} from "../services/loadersFunction";
import AuthLayout from "../layout/authLayout/AuthLayout";
import UsersPage from "../pages/UsersPage";
import { UserProfilePage } from "../pages/UserProfilePage";
import ProtectedRoute from "./ProtectedRouter";
import { Roles } from "../components/users/assignRolesModals/AssignRolesModal";

export const router = createBrowserRouter([
  {
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <RootLayout />,
        loader: checkAuthLoader,
        children: [
          {
            path: "profile",
            element: <HomePage />,
          },
          {
            path: "todo",
            element: <Todo />,
          },
          {
            path: "users",
            element: (
              <ProtectedRoute requiredRoles={[Roles.ADMIN, Roles.MODERATOR]}>
                <UsersPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "users/:id",
            element: (
              <ProtectedRoute requiredRoles={[Roles.ADMIN, Roles.MODERATOR]}>
                <UserProfilePage />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        element: <AuthLayout />,
        children: [
          {
            path: "/signin",
            errorElement: <Error />,
            element: <Login />,
          },

          {
            path: "/signup",
            errorElement: <Error />,
            element: <Registration />,
          },
        ],
      },
    ],
  },
]);
export default function RouterStore(): JSX.Element {
  return <RouterProvider router={router} />;
}
