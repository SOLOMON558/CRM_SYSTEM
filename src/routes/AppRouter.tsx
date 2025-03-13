import { Routes, Route, Navigate } from "react-router-dom";
import TodoPage from "../pages/TodoPage";
import Home from "../pages/HomePage";
import Autorization from "../pages/Autorization";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/profile" element={<Home />} />
      <Route path="/todo" element={<TodoPage />} />
      <Route path="/autoriz" element={<Autorization />} />
      <Route path="*" element={<Navigate to="/autoriz" replace />} />
    </Routes>
  );
}
