// server.js (versão para Vercel)
import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";

const app = express();
app.use(cors());
app.use(express.json());

// Banco em memória (POC)
let events = [];

// ------------------------------
// VARIÁVEIS DA VERCEL
// ------------------------------
const MANAGER_EMAIL = process.env.MANAGER_EMAIL;
const MANAGER_PASS = process.env.MANAGER_EMAIL_PASS;

// ------------------------------
// Função para enviar email (opcional)
// ------------------------------
async function notifyManager(entry) {
  if (!MANAGER_EMAIL || !MANAGER_PASS) {
    console.log("⚠️ Email não configurado. Notificação não enviada.");
    return;
  }

  try {
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
        <h3>Novo registro</h3>
        <p><b>Email:</b> ${entry.email}</p>
        <p><b>Ação:</b> ${entry.type}</p>
        <p><b>Data/Hora:</b> ${new Date(entry.time).toLocaleString()}</p>
      `,
    });

    console.log("📧 Email enviado ao gerente!");
  } catch (err) {
    console.log("❌ Erro ao enviar e-mail:", err.message);
  }
}

// ------------------------------
// ROTAS DO SISTEMA
// ------------------------------

app.get("/health", (_, res) => {
  res.json({ status: "API OK", timestamp: new Date() });
});

app.post("/checkin", (req, res) => {
  const email = req.body.email;
  const entry = { email, type: "checkin", time: new Date() };

  events.push(entry);
  notifyManager(entry);

  res.json({ message: "Check-in registrado", entry });
});

app.post("/checkout", (req, res) => {
  const email = req.body.email;
  const entry = { email, type: "checkout", time: new Date() };

  events.push(entry);
  notifyManager(entry);

  res.json({ message: "Check-out registrado", entry });
});

app.get("/status", (req, res) => {
  const email = req.query.email;
  const last = events.filter((e) => e.email === email).pop();

  res.json({
    email,
    status: last?.type === "checkin" ? "online" : "offline",
    lastEvent: last,
  });
});

app.get("/events", (req, res) => {
  const limit = Math.min(parseInt(req.query.limit || "200"), 500);
  const items = events
    .slice()
    .sort((a, b) => new Date(b.time) - new Date(a.time))
    .slice(0, limit);

  res.json({ items, total: items.length });
});

// ❌ IMPORTANTE: NÃO USAR app.listen() NA VERCEL
// ✅ Exporta app para Vercel usar como serverless function
export default app;
