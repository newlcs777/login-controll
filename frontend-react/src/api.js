// ✅ Base da URL do backend vindo do .env da Vercel
const API_BASE = import.meta.env.VITE_API_URL;

// Se a variável não estiver definida, dá erro explícito (melhor para debug)
if (!API_BASE) {
  console.warn("⚠️ ERRO: VITE_API_URL não encontrada. Configure na Vercel.");
}

// ----------------------------------------
// ✅ Registrar check-in
// ----------------------------------------
export async function apiCheckin(email) {
  const r = await fetch(`${API_BASE}/checkin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!r.ok) throw new Error("❌ Falha no check-in");
  return r.json();
}

// ----------------------------------------
// ✅ Registrar check-out
// ----------------------------------------
export async function apiCheckout(email) {
  const r = await fetch(`${API_BASE}/checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!r.ok) throw new Error("❌ Falha no check-out");
  return r.json();
}

// ----------------------------------------
// ✅ Consultar status do usuário
// ----------------------------------------
export async function apiStatus(email) {
  const url = `${API_BASE}/status?email=${encodeURIComponent(email)}`;
  const r = await fetch(url);

  if (!r.ok) throw new Error("❌ Falha ao consultar status");
  return r.json();
}

// ----------------------------------------
// ✅ Listar registros (Dashboard do gerente)
// ----------------------------------------
export async function apiEvents(limit = 100) {
  const url = `${API_BASE}/events?limit=${limit}`;
  const r = await fetch(url);

  if (!r.ok) throw new Error("❌ Falha ao listar eventos");
  return r.json();
}
