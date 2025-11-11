import { useEffect, useState } from "react";
import { apiEvents } from "../api";

export default function ManagerPage() {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    loadEvents();
  }, []);

  async function loadEvents() {
    try {
      const response = await apiEvents(200);
      const items = response.items || [];
      setEvents(items);
    } catch (err) {
      alert("Erro ao carregar eventos");
    }
  }

  const filtered = events.filter((e) =>
    e.email.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="page">
      <h1>Dashboard do Gerente</h1>

      <input
        placeholder="Filtrar por e-mail"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      <table>
        <thead>
          <tr>
            <th>E-mail</th>
            <th>Ação</th>
            <th>Data/Hora</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((e, index) => (
            <tr key={index}>
              <td>{e.email}</td>
              <td>{e.type}</td>
              <td>{new Date(e.time).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
