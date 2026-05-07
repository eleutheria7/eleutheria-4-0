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
      const { connection, lastDisconnect, qr } = update;

      console.log("🔄 UPDATE:", update.connection);

      /* ===== QR ===== */
      if (qr) {
        console.log("📱 QR GERADO!");

        const qrImage = await QRCode.toDataURL(qr);

        console.log("\n👇 COPIE ESSA URL E ABRA NO NAVEGADOR:\n");
        console.log(qrImage);
        console.log("\n============================\n");
      }

      /* ===== CONEXÃO ===== */
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
      }
    });

    sock.ev.on("creds.update", saveCreds);

  } catch (err) {
    console.error("💥 ERRO NO START:", err);
  }
}

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