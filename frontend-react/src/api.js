// ✅ Base da URL do backend (vem do .env)
// Se não existir .env, usa localhost para evitar erro
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000";

// ✅ Registrar check-in
export async function apiCheckin(email) {
  const r = await fetch(`${API_BASE}/checkin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!r.ok) throw new Error("Falha no check-in");
  return r.json();
}

// ✅ Registrar check-out
export async function apiCheckout(email) {
  const r = await fetch(`${API_BASE}/checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!r.ok) throw new Error("Falha no check-out");
  return r.json();
}

// ✅ Consultar status do usuário
export async function apiStatus(email) {
  const r = await fetch(`${API_BASE}/status?email=${encodeURIComponent(email)}`);

  if (!r.ok) throw new Error("Falha ao consultar status");
  return r.json();
}

// ✅ Listar registros (dashboard do gerente)
export async function apiEvents(limit = 100) {
  const r = await fetch(`${API_BASE}/events?limit=${limit}`);

  if (!r.ok) throw new Error("Falha ao listar eventos");
  return r.json();
}
