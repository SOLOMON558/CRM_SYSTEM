import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import TodoPage from "../pages/TodoPage";
import HomePage from "../pages/HomePage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/profile" element={<HomePage />} />
        <Route path="/todo" element={<TodoPage />} />
        <Route path="*" element={<Navigate to="/todo" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
