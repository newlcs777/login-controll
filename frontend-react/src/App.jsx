import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import EmployeePage from "./pages/EmployeePage";
import ManagerPage from "./pages/ManagerPage";

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <NavLink to="/">Funcionário</NavLink>
        <NavLink to="/manager">Gerente</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<EmployeePage />} />
        <Route path="/manager" element={<ManagerPage />} />
      </Routes>
    </BrowserRouter>
  );
}
