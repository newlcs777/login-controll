import { useState } from "react";
import { apiCheckin, apiCheckout, apiStatus } from "../api";

export default function EmployeePage() {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handle(action) {
    if (!email) return alert("Informe o e-mail!");

    setLoading(true);
    try {
      const response =
        action === "checkin"
          ? await apiCheckin(email)
          : action === "checkout"
          ? await apiCheckout(email)
          : await apiStatus(email);

      setResult(response);
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);
  }

  return (
    <div className="page">
      <h1>Remote Work Access</h1>

      <input
        type="email"
        placeholder="E-mail do colaborador"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <div className="actions">
        <button disabled={loading} onClick={() => handle("checkin")}>
          Check-in
        </button>
        <button disabled={loading} onClick={() => handle("checkout")}>
          Check-out
        </button>
        <button disabled={loading} onClick={() => handle("status")}>
          Ver Status
        </button>
      </div>

      <pre>{result ? JSON.stringify(result, null, 2) : "Sem dados ainda…"}</pre>
    </div>
  );
}
