import { Message } from "../models/messageModel.js";

export async function seedInitialMessages() {
  const existing = await Message.findAll();
  if (existing.length === 0) {
    await Message.bulkCreate([
      { content: "Witaj świecie!" },
      { content: "To jest testowa wiadomość." },
      { content: "Działa, super!" },
    ]);
    console.log("🔁 Dodano domyślne wiadomości");
  } else {
    console.log("✅ Wiadomości już istnieją — pomijam seed");
  }
}
 