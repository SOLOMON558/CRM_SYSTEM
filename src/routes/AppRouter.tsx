import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import TodoPage from "../TodoListPage/TodoPage";
import Home from "../components/Home";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/profile" element={<Home />} />
        <Route path="/todo" element={<TodoPage />} />
        <Route path="*" element={<Navigate to="/todo" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
