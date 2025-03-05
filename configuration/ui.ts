import { AI_NAME, OWNER_NAME } from "../configuration/identity";

export const CHAT_HEADER: string = "Meal Mate";
export const MESSAGE_PLACEHOLDER: string = "[MESSAGE PLACEHOLDER]";
export const FOOTER_MESSAGE: string = `[Customized AI by ${OWNER_NAME}]`;
export const CLEAR_BUTTON_TEXT: string = "New Meal";
export const PAGE_TITLE: string = "Meal Mate";
export const PAGE_DESCRIPTION: string = `Chat with ${AI_NAME}, ${OWNER_NAME}'s AI assistant.`;
export const EMPTY_CITATION_MESSAGE: string = "Unspecified source";
export const BOT_AVATAR: string = "/chatbotpic.png"; 

// **Force UI Changes**
export const CHAT_CONTAINER_STYLE = "bg-gray-200 min-h-screen flex flex-col items-center justify-center p-4"; 
export const CHAT_BUBBLE_STYLE = "bg-white border border-gray-400 rounded-xl p-4 shadow-md max-w-lg";
export const INPUT_STYLE = "border border-gray-500 p-3 rounded-lg w-full text-lg";
export const BUTTON_STYLE = "bg-indigo-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-indigo-800 transition";
