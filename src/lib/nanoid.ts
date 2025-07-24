import { customAlphabet } from 'nanoid';

const characters = '0123456789abcdefghijklmnopqrstuvwxyz';

export const createChatId = customAlphabet(characters, 32);
export const createMessageId = customAlphabet(characters, 32);
