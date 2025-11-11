import { useState } from "react";
import { apiCheckin, apiCheckout } from "../api";

export default function EmployeePage() {
  const [email, setEmail] = useState("");
  const [responseMsg, setResponseMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handle(action) {
    if (!email) return alert("Informe o e-mail!");

    setLoading(true);
    setResponseMsg(null);

    try {
      const response =
        action === "checkin"
          ? await apiCheckin(email)
          : await apiCheckout(email);

      const hora = new Date(response.entry.time).toLocaleTimeString();
      const acao = response.entry.type === "checkin" ? "Login" : "Logout";

      setResponseMsg({
        title: `${acao} realizado com sucesso!`,
        subtitle: `Registro efetuado às ${hora}`,
        status: response.entry.type,
      });
    } catch (err) {
      setResponseMsg({
        title: "Erro ao registrar",
        subtitle: "Tente novamente em instantes.",
        status: "erro",
      });
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md bg-white border border-slate-200 shadow-lg rounded-2xl p-8">

        <h1 className="text-center text-xl font-semibold text-slate-800 mb-1">
          Remote  Access
        </h1>
        <p className="text-center text-xs text-slate-500 mb-6">
          welcome

        </p>

        <label className="text-sm font-medium text-slate-700 mb-2 block">
          E-mail do colaborador
        </label>

        <input
          type="email"
          placeholder="nome@empresa.com"
          className="w-full px-4 py-2 border border-slate-300 rounded-lg text-slate-700 
          focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="mt-6 flex flex-col gap-3">
          <button
            disabled={loading}
            onClick={() => handle("checkin")}
            className="w-full py-2 rounded-lg font-medium bg-blue-600 text-white
            hover:bg-blue-700 transition disabled:opacity-40"
          >
            {loading ? "Processando..." : "Login"}
          </button>

          <button
            disabled={loading}
            onClick={() => handle("checkout")}
            className="w-full py-2 rounded-lg font-medium bg-slate-600 text-white
            hover:bg-slate-700 transition disabled:opacity-40"
          >
            {loading ? "Processando..." : "Logout"}
          </button>
        </div>

        {responseMsg && (
          <div
            className={`mt-6 p-4 rounded-lg text-sm font-medium border transition
            ${
              responseMsg.status === "checkin"
                ? "bg-green-50 text-green-700 border-green-300"
                : responseMsg.status === "checkout"
                ? "bg-red-50 text-red-700 border-red-300"
                : "bg-yellow-50 text-yellow-700 border-yellow-300"
            }`}
          >
            <p className="text-base font-semibold">{responseMsg.title}</p>
            <p className="text-xs opacity-80">{responseMsg.subtitle}</p>
          </div>
        )}
      </div>
    </div>
  );
}
