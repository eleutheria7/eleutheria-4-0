/* eslint-disable react-hooks/rules-of-hooks */

import makeWASocket, {
  DisconnectReason,
  useMultiFileAuthState,
} from "@whiskeysockets/baileys";

import P from "pino";
import express from "express";
import QRCode from "qrcode-terminal";

const app = express();
app.use(express.json());

let sock;

/* ================= START WHATS ================= */

async function start() {
  const { state, saveCreds } = await useMultiFileAuthState("./auth");

  sock = makeWASocket({
    auth: state,
    printQRInTerminal: false,
    logger: P({ level: "silent" }),
    browser: ["Eleutheria", "Chrome", "1.0"],
  });

  /* QR CODE */
  sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr) {
      console.log("📱 Escaneie o QR:");
      QRCode.generate(qr, { small: true });
    }

    if (connection === "close") {
      const shouldReconnect =
        lastDisconnect?.error?.output?.statusCode !==
        DisconnectReason.loggedOut;

      console.log("❌ Conexão fechada. Reconectando...", shouldReconnect);

      if (shouldReconnect) {
        start();
      }
    }

    if (connection === "open") {
      console.log("✅ WhatsApp conectado!");
    }
  });

  /* SALVAR SESSÃO */
  sock.ev.on("creds.update", saveCreds);
}

/* ================= ENVIAR MSG ================= */

app.post("/send", async (req, res) => {
  try {
    const { phone, message } = req.body;

    if (!phone || !message) {
      return res.status(400).json({ error: "Dados inválidos" });
    }

    const jid = phone + "@s.whatsapp.net";

    await sock.sendMessage(jid, { text: message });

    return res.json({ success: true });
  } catch (err) {
    console.error("Erro ao enviar:", err);
    return res.status(500).json({ error: "Erro ao enviar mensagem" });
  }
});

/* ================= HEALTHCHECK ================= */

app.get("/", (req, res) => {
  res.send("WhatsApp API rodando 🚀");
});

/* ================= START SERVER ================= */

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("🚀 Servidor rodando na porta", PORT);
  start();
});