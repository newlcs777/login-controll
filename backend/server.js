import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";

const app = express();
app.use(cors());
app.use(express.json());

// "Banco" em memória só para a POC
let events = [];

// --------------------------------------
// CONFIGURAR EMAIL DO GERENTE (opcional)
// --------------------------------------
const MANAGER_EMAIL = process.env.MANAGER_EMAIL;
const MANAGER_PASS = process.env.MANAGER_EMAIL_PASS;

async function notifyManager(entry) {
  if (!MANAGER_EMAIL || !MANAGER_PASS) {
    console.log("⚠️ Email não configurado, não enviando notificação");
    return;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: MANAGER_EMAIL,
      pass: MANAGER_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Remote Work Access" <${MANAGER_EMAIL}>`,
    to: MANAGER_EMAIL,
    subject: `Registro de ${entry.type.toUpperCase()} - ${entry.email}`,
    html: `
      <h3>Novo registro de atividade</h3>
      <p><b>Email:</b> ${entry.email}</p>
      <p><b>Ação:</b> ${entry.type}</p>
      <p><b>Data/Hora:</b> ${new Date(entry.time).toLocaleString()}</p>
    `,
  });

  console.log("📧 Email enviado ao gerente!");
}

// --------------------------------------
// ROTAS DA API
// --------------------------------------

// Teste de vida
app.get("/health", (req, res) => {
  res.json({ status: "API OK", timestamp: new Date() });
});

// Check-in (entrada)
app.post("/checkin", (req, res) => {
  const email = req.body.email;
  const entry = { email, type: "checkin", time: new Date() };
  events.push(entry);

  notifyManager(entry).catch(console.error);

  res.json({ message: "Check-in registrado", entry });
});

// Check-out (saída)
app.post("/checkout", (req, res) => {
  const email = req.body.email;
  const entry = { email, type: "checkout", time: new Date() };
  events.push(entry);

  notifyManager(entry).catch(console.error);

  res.json({ message: "Check-out registrado", entry });
});

// Status do usuário
app.get("/status", (req, res) => {
  const email = req.query.email;
  const last = events.filter((e) => e.email === email).pop();

  res.json({
    email,
    status: last?.type === "checkin" ? "online" : "offline",
    lastEvent: last,
  });
});

// ✅ LISTAR EVENTOS — (Dashboard do gerente)
app.get("/events", (req, res) => {
  const limit = Math.min(parseInt(req.query.limit || "200"), 500);
  const items = events
    .slice()
    .sort((a, b) => new Date(b.time) - new Date(a.time))
    .slice(0, limit);

  res.json({ items, total: items.length });
});

// Iniciar servidor
app.listen(3000, () => console.log("🚀 Backend rodando na porta 3000"));
