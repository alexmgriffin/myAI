import { OWNER_NAME, AI_NAME } from "./identity";
import { getBettingInsights } from "../configuration/bettingLogic"; // Corrected import

export const INITIAL_MESSAGE: string = `Hello, I'm ${AI_NAME}, ${OWNER_NAME}'s AI assistant.`;
export const DEFAULT_RESPONSE_MESSAGE: string = `Sorry, I'm having trouble generating a response. Please try again later.`;
export const WORD_CUTOFF: number = 8000;
export const WORD_BREAK_MESSAGE: string = `I'm reaching my response limit. Let's continue in a new message.`;
export const HISTORY_CONTEXT_LENGTH: number = 7;

export async function handleUserMessage(userInput: string): Promise<string> {
    const lowerInput = userInput.toLowerCase();

    if (lowerInput.includes("betting") || lowerInput.includes("odds") || lowerInput.includes("stats")) {
        const words = lowerInput.split(" ");
        const teamName = words[words.length - 1]; // Assume team name is the last word

        if (!teamName) {
            return "Please specify a team to get betting insights.";
        }

        try {
            const insights = await getBettingInsights(teamName);
            return insights;
        } catch (error) {
            console.error("Error fetching betting insights:", error);
            return "Sorry, I couldn't fetch betting insights at the moment.";
        }
    }

    return "I'm here to help! Ask me about sports betting insights or odds.";
}
