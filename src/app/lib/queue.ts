type Job = {
  phone: string;
  message: string;
};

const queue: Job[] = [];
let processing = false;

export function addToQueue(job: Job) {
  queue.push(job);
  processQueue();
}

async function processQueue() {
  if (processing) return;

  processing = true;

  while (queue.length > 0) {
    const job = queue.shift();

    if (!job) continue;

    try {
      const { sendWhatsAppMessage } = await import("./whatsapp");

      await sendWhatsAppMessage(job.phone, job.message);

      await new Promise((r) => setTimeout(r, 3000)); // delay
    } catch (err) {
      console.error(err);
    }
  }

  processing = false;
}