import { InferSelectModel } from "drizzle-orm";
import { chatMessagesTable, chatsTable } from "./schema";

export type ChatMessage = InferSelectModel<typeof chatMessagesTable>;
export type Chat = InferSelectModel<typeof chatsTable>;