/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */

const http = require("http");
const qrcode = require("qrcode-terminal");

let sock;

async function start() {
  const baileys = await import("@whiskeysockets/baileys");

  const makeWASocket = baileys.default;
  const {
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion,
  } = baileys;

  const { state, saveCreds } = await useMultiFileAuthState("./auth");
  const { version } = await fetchLatestBaileysVersion();

  sock = makeWASocket({
    auth: state,
    version,
    browser: ["Ubuntu", "Chrome", "120"],
  });

  sock.ev.on("connection.update", (update) => {
    const { connection, qr, lastDisconnect } = update;

    if (qr) {
      console.clear();
      console.log("📱 ESCANEIE O QR:\n");
      qrcode.generate(qr, { small: true });
    }

    if (connection === "open") {
      console.log("✅ WhatsApp conectado!");
    }

    if (connection === "close") {
      const shouldReconnect =
        lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;

      console.log("🔄 Reconectando em 3s...");

      if (shouldReconnect) {
        setTimeout(start, 3000);
      } else {
        console.log("❌ Deslogado.");
      }
    }
  });

  sock.ev.on("creds.update", saveCreds);
}

/* ================= ENVIO ================= */

async function sendMessage(phone, text) {
  try {
    if (!sock) throw new Error("WhatsApp não conectado");

    const jid = phone.replace(/\D/g, "") + "@s.whatsapp.net";

    await sock.sendMessage(jid, { text });

    console.log("📨 Mensagem enviada para:", phone);
  } catch (err) {
    console.log("❌ Erro ao enviar:", err.message);
  }
}

/* ================= API ================= */

const server = http.createServer(async (req, res) => {
  // 🔐 Token (opcional)
  const AUTH_TOKEN = process.env.TOKEN || "meu-token";

  // Healthcheck (UptimeRobot)
  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200);
    return res.end("OK");
  }

  // Endpoint de envio
  if (req.method === "POST" && req.url === "/send") {
    // 🔐 valida token
    if (req.headers.authorization !== `Bearer ${AUTH_TOKEN}`) {
      res.writeHead(401);
      return res.end("Unauthorized");
    }

    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", async () => {
      try {
        const { phone, message } = JSON.parse(body);

        await sendMessage(phone, message);

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: true }));
      } catch (err) {
        res.writeHead(500);
        res.end("Erro ao enviar");
      }
    });

    return;
  }

  res.writeHead(404);
  res.end();
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`🚀 API rodando na porta ${PORT}`);
});

start();