import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const chatsTable = sqliteTable("chats_table", {
  id: text().notNull().primaryKey(),
  inserted_at: int().notNull()
});

export const chatMessagesTable = sqliteTable("chat_messages_table", {
  id: text().notNull().primaryKey(),
  chat_id: text().notNull().references(() => chatsTable.id),
  message: text().notNull(),
  role: text().notNull().$type<"user" | "assistant">().default("user"),
  score: int().notNull().default(0),
  inserted_at: int().notNull()
});
