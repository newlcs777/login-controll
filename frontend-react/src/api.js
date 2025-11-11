// ✅ Base da URL do backend (Vercel/Render)
// Se não existir variável, assume localhost para desenvolvimento
let API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Remove barra final, se tiver (evita URL com //checkin)
API_BASE = API_BASE.replace(/\/$/, "");

// Log somente em modo dev
if (!import.meta.env.VITE_API_URL) {
  console.warn("⚠️ Variável VITE_API_URL não encontrada. Usando localhost temporariamente.");
}

console.log("🌐 API conectando em:", API_BASE);

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
