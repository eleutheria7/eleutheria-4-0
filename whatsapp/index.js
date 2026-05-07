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
let isStarting = false;

/* ================= START WHATS ================= */

async function start() {
  if (isStarting) return;
  isStarting = true;

  console.log("🔥 Iniciando WhatsApp...");

  try {
    const { state, saveCreds } = await useMultiFileAuthState(
      process.cwd() + "/auth"
    );

    console.log("📁 Auth preparado");

    sock = makeWASocket({
      auth: state,
      printQRInTerminal: false,
      logger: P({ level: "silent" }),
      browser: ["Windows", "Chrome", "120.0.0"], // mais realista
    });

    sock.ev.on("connection.update", async (update) => {
      const { connection, lastDisconnect, qr } = update;

      console.log("🔄 STATUS:", connection);

      /* ===== QR BASE64 ===== */
      if (qr) {
        console.log("\n📱 QR GERADO!");

        const qrBase64 = await QRCode.toDataURL(qr);

        console.log("\n👇 COPIE E COLE NO NAVEGADOR:\n");
        console.log(qrBase64);
        console.log("\n============================\n");
      }

      /* ===== CONEXÃO ===== */
      if (connection === "close") {
        const status = lastDisconnect?.error?.output?.statusCode;

        console.log("💥 ERRO:", status);

        if (status === DisconnectReason.loggedOut) {
          console.log("🔒 Sessão desconectada. Precisa novo QR.");
          isStarting = false;
          return;
        }

        const delay = Math.floor(Math.random() * 15000) + 15000; // 15s–30s

        console.log(`🔁 Reconectando em ${delay / 1000}s...`);

        isStarting = false;

        setTimeout(() => {
          start();
        }, delay);
      }

      if (connection === "open") {
        console.log("✅ WhatsApp conectado!");
        isStarting = false;
      }
    });

    sock.ev.on("creds.update", saveCreds);
  } catch (err) {
    console.error("💥 ERRO NO START:", err);
    isStarting = false;
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

    let cleanPhone = phone.replace(/\D/g, "");

    if (!cleanPhone.startsWith("55")) {
      cleanPhone = "55" + cleanPhone;
    }

    const jid = cleanPhone + "@s.whatsapp.net";

    // delay pra evitar spam
    await new Promise((resolve) => setTimeout(resolve, 1000));

    await sock.sendMessage(jid, { text: message });

    console.log("📨 Enviado para:", cleanPhone);

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

  // delay inicial pra evitar comportamento suspeito
  setTimeout(() => {
    start();
  }, 5000);
});