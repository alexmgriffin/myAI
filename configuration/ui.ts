import { AI_NAME, OWNER_NAME } from "../configuration/identity";

export const CHAT_HEADER: string = "Meal Mate";
export const MESSAGE_PLACEHOLDER: string = "[MESSAGE PLACEHOLDER]";
export const FOOTER_MESSAGE: string = `[Customized AI by ${OWNER_NAME}]`;
export const CLEAR_BUTTON_TEXT: string = "New Meal";
export const PAGE_TITLE: string = "Meal Mate";
export const PAGE_DESCRIPTION: string = `Chat with ${AI_NAME}, ${OWNER_NAME}'s AI assistant.`;
export const EMPTY_CITATION_MESSAGE: string = "Unspecified source";
export const BOT_AVATAR: string = "/ChatBotPic.png"; // Ensure image is in the public folder

export const CHAT_CONTAINER_STYLE = "bg-gray-100 min-h-screen flex flex-col items-center justify-center"; 
export const CHAT_BUBBLE_STYLE = "bg-white border border-gray-300 rounded-lg p-4 shadow-md max-w-xl";
export const INPUT_STYLE = "border border-gray-400 p-2 rounded-lg w-full";
export const BUTTON_STYLE = "bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700";
