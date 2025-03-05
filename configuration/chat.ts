import { OWNER_NAME, AI_NAME } from "./identity";

export const INITIAL_MESSAGE: string = `Hello, I'm ${AI_NAME}, ${OWNER_NAME}'s AI assistant.`;
export const DEFAULT_RESPONSE_MESSAGE: string = `Sorry, I'm having trouble generating a response. Please try again later.`;
export const WORD_CUTOFF: number = 8000;
export const WORD_BREAK_MESSAGE: string = `I'm reaching my response limit. Let's continue in a new message.`;
export const HISTORY_CONTEXT_LENGTH: number = 7;

// Function to handle user messages
export function handleUserMessage(): string {
    return "I'm here to help! Ask me about sports betting insights or odds.";
}
