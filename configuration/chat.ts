import { OWNER_NAME, AI_NAME } from "./identity";
import { BOT_AVATAR, CHAT_CONTAINER_STYLE, CHAT_BUBBLE_STYLE } from "./ui";

export const INITIAL_MESSAGE: string = `
  Hello, I'm ${AI_NAME}, your personal meal and recipe assistant. 
  Tell me what ingredients you have, your dietary preferences, or your nutrition goals, 
  and I'll whip up the perfect meal idea for you! 🍽️
`;
export const DEFAULT_RESPONSE_MESSAGE: string = `Sorry, I'm having trouble generating a response. Please try again later.`;
export const WORD_CUTOFF: number = 8000;
export const WORD_BREAK_MESSAGE: string = `I'm reaching my response limit. Let's continue in a new message.`;
export const HISTORY_CONTEXT_LENGTH: number = 7;

export const CHAT_STYLE = {
  container: CHAT_CONTAINER_STYLE,
  bubble: CHAT_BUBBLE_STYLE,
  avatar: BOT_AVATAR
};
