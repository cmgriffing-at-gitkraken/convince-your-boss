import { db } from "@/lib/drizzle";
import { chatMessagesTable, chatsTable } from "@/db/schema";
import { createChatId, createMessageId } from "@/lib/nanoid";

export async function POST() {
  const newChatId = createChatId();

  await db.insert(chatsTable).values({
    id: newChatId,
    inserted_at: Date.now(),
  });

  const firstMessage = {
    id: createMessageId(),
    chat_id: newChatId,
    message:
      "This meeting probably could have been an email. But what do you need?",
    role: "assistant",
    inserted_at: Date.now(),
  } as const;

  await db.insert(chatMessagesTable).values(firstMessage);

  return new Response(JSON.stringify({ chatId: newChatId }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
