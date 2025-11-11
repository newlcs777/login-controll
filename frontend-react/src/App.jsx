import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import EmployeePage from "./pages/EmployeePage";
import ManagerPage from "./pages/ManagerPage";
import "./index.css";
export default function App() {
  return (
    <BrowserRouter>
      
<nav className="w-full bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
  <div className="flex items-center gap-6">
    <a
      href="/"
      className="text-gray-700 font-medium hover:text-blue-600 transition"
    >
      Funcionário
    </a>

    <span className="text-gray-300">|</span>

    <a
      href="/manager"
      className="text-gray-700 font-medium hover:text-blue-600 transition"
    >
      Gerente
    </a>
  </div>
</nav>

      <Routes>
        <Route path="/" element={<EmployeePage />} />
        <Route path="/manager" element={<ManagerPage />} />
      </Routes>
    </BrowserRouter>
  );
}
