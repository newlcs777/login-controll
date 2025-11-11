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
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl border border-slate-200 p-8">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-xl font-semibold text-slate-800">
              Dashboard do Gerente
            </h1>
            <p className="text-xs text-slate-500">
              Monitoramento de atividade (Login / Logout)
            </p>
          </div>

          <button
            onClick={loadEvents}
            className="px-4 py-2 bg-blue-600 rounded-lg text-white font-medium hover:bg-blue-700 transition"
          >
            Atualizar
          </button>
        </div>

        {/* filtro */}
        <label className="text-sm text-slate-600">Filtrar por e-mail</label>
        <input
          type="text"
          placeholder="exemplo@empresa.com"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full mt-2 mb-6 px-4 py-2 border border-slate-300 rounded-lg 
          focus:ring-2 focus:ring-blue-500 transition outline-none text-slate-700"
        />

        {/* tabela */}
        <div className="overflow-auto max-h-[420px] border border-slate-200 rounded-lg">
          <table className="w-full text-left">
            <thead className="bg-slate-100 border-b border-slate-200">
              <tr className="text-sm text-slate-600">
                <th className="py-3 px-4">E-mail</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Data / Hora</th>
              </tr>
            </thead>

            <tbody>
              {filtered.length > 0 ? (
                filtered.map((e, index) => (
                  <tr
                    key={index}
                    className="border-b border-slate-100 hover:bg-slate-50 transition text-sm"
                  >
                    <td className="py-2 px-4">{e.email}</td>

                    <td
                      className={`py-2 px-4 font-semibold ${
                        e.type === "checkin"
                          ? "text-blue-600"
                          : "text-slate-600"
                      }`}
                    >
                      {e.type === "checkin" ? "Login" : "Logout"}
                    </td>

                    <td className="py-2 px-4">
                      {new Date(e.time).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={3}
                    className="py-4 text-center text-slate-500 text-sm"
                  >
                    Nenhum registro encontrado...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
