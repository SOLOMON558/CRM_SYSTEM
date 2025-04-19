import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import Error from "./pages/Error";
import HomePage from "./pages/Home";
import Todo from "./pages/Todo";
import Login from "./Components/Login";
import Registration from "./Components/Registration";
import { checkAuthLoader } from "./Api/loadersFunction";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
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
    ],
  },
  {
    path: "signin",
    element: <Login />,
  },

  {
    path: "signup",
    element: <Registration />,
  },
]);
export default function App() {
  return <RouterProvider router={router} />;
}
