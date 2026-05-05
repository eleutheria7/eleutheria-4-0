/* eslint-disable react-hooks/rules-of-hooks */

import makeWASocket, {
  useMultiFileAuthState,
  DisconnectReason,
  WASocket,
  ConnectionState
} from "@whiskeysockets/baileys";

import qrcode from "qrcode-terminal";

let sock: WASocket | null = null;
let isConnecting = false;
let reconnectAttempts = 0;
const MAX_RECONNECT_ATTEMPTS = 5;

export async function initWhatsApp(): Promise<WASocket | null> {
  if (sock || isConnecting) return sock;

  isConnecting = true;

  const { state, saveCreds } = await useMultiFileAuthState("auth");

  sock = makeWASocket({
    auth: state,
  });

  sock.ev.on("connection.update", (update: Partial<ConnectionState>) => {
    const { connection, lastDisconnect, qr } = update;

    /* ================= QR CODE ================= */
    if (qr) {
      console.log("\n📱 ESCANEIE O QR ABAIXO:\n");
      qrcode.generate(qr, { small: true });
    }

    if (!connection) return;

    /* ================= CONECTADO ================= */
    if (connection === "open") {
      console.log("✅ WhatsApp conectado!");
      isConnecting = false;
      reconnectAttempts = 0;
    }

    /* ================= DESCONECTADO ================= */
    if (connection === "close") {
      const statusCode =
        (lastDisconnect?.error as { output?: { statusCode?: number } })?.output?.statusCode;

      const isLoggedOut = statusCode === DisconnectReason.loggedOut;

      sock = null;
      isConnecting = false;

      if (isLoggedOut) {
        console.log("❌ Sessão encerrada. Escaneie novamente.");
        reconnectAttempts = 0;
        return;
      }

      /* ===== CONTROLE DE RECONEXÃO ===== */
      if (reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
        console.log("🚫 Máximo de tentativas de reconexão atingido.");
        return;
      }

      reconnectAttempts++;

      console.log(`🔄 Reconectando... (${reconnectAttempts}/${MAX_RECONNECT_ATTEMPTS})`);

      setTimeout(() => {
        initWhatsApp();
      }, 3000);
    }
  });

  sock.ev.on("creds.update", saveCreds);

  return sock;
}

/* ================= ENVIO DE MENSAGEM ================= */

export async function sendWhatsAppMessage(phone: string, message: string) {
  const client = await initWhatsApp();

  if (!client) {
    throw new Error("WhatsApp não conectado");
  }

  const formatted = phone.replace(/\D/g, "") + "@s.whatsapp.net";

  await client.sendMessage(formatted, {
    text: message,
  });
}