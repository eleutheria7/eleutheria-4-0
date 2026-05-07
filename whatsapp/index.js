/* eslint-disable react-hooks/rules-of-hooks */

import makeWASocket, {
  DisconnectReason,
  useMultiFileAuthState,
} from "@whiskeysockets/baileys";

import P from "pino";
import express from "express";
import QRCode from "qrcode";

const app = express();
app.use(express.json());

let sock;
let currentQR = null;

/* ================= START WHATS ================= */

async function start() {
  try {
    console.log("🔥 Iniciando WhatsApp...");

    const { state, saveCreds } = await useMultiFileAuthState(
      process.cwd() + "/auth"
    );

    console.log("📁 Auth preparado");

    sock = makeWASocket({
      auth: state,
      printQRInTerminal: false,
      logger: P({ level: "silent" }),
      browser: ["Eleutheria", "Chrome", "1.0"],
    });

    sock.ev.on("connection.update", async (update) => {
      console.log("🔄 UPDATE:", JSON.stringify(update));

      const { connection, lastDisconnect, qr } = update;

      if (qr) {
        console.log("📱 QR RECEBIDO!");

        currentQR = await QRCode.toDataURL(qr);
      }

      if (connection === "close") {
        const shouldReconnect =
          lastDisconnect?.error?.output?.statusCode !==
          DisconnectReason.loggedOut;

        console.log("❌ Conexão fechada. Reconectando...", shouldReconnect);

        if (shouldReconnect) {
          setTimeout(start, 3000);
        }
      }

      if (connection === "open") {
        console.log("✅ WhatsApp conectado!");
        currentQR = null;
      }
    });

    sock.ev.on("creds.update", saveCreds);
  } catch (err) {
    console.error("💥 ERRO NO START:", err);
  }
}

/* ================= QR PAGE ================= */

app.get("/qr", (req, res) => {
  if (!currentQR) {
    return res.send(`
      <html>
        <body style="font-family:sans-serif;text-align:center;margin-top:50px;">
          <h2>⏳ Aguardando QR ou já conectado...</h2>
          <p>Atualize a página</p>
        </body>
      </html>
    `);
  }

  res.send(`
    <html>
      <head>
        <title>QR WhatsApp</title>
      </head>
      <body style="text-align:center;font-family:sans-serif;">
        <h2>📱 Escaneie o QR</h2>
        <img src="${currentQR}" />
        <p>Atualize a página se não aparecer</p>
      </body>
    </html>
  `);
});

/* ================= ENVIAR MSG ================= */

app.post("/send", async (req, res) => {
  try {
    const { phone, message } = req.body;

    if (!phone || !message) {
      return res.status(400).json({ error: "Dados inválidos" });
    }

    if (!sock) {
      return res.status(500).json({ error: "WhatsApp não conectado ainda" });
    }

    const jid = phone.replace(/\D/g, "") + "@s.whatsapp.net";

    await sock.sendMessage(jid, { text: message });

    console.log("📨 Enviado para:", phone);

    return res.json({ success: true });
  } catch (err) {
    console.error("❌ Erro ao enviar:", err);
    return res.status(500).json({ error: "Erro ao enviar mensagem" });
  }
});

/* ================= HEALTH ================= */

app.get("/", (req, res) => {
  res.send("WhatsApp API rodando 🚀");
});

/* ================= START SERVER ================= */

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("🚀 Servidor rodando na porta", PORT);
  start();
});