import { PineconeClient } from "@pinecone-database/pinecone";

const PINECONE_INDEX = "nba-betting-odds";

// 📌 Function to retrieve stored NBA data from Pinecone
async function fetchDataFromPinecone(team: string) {
    const client = new PineconeClient();
    await client.init({
        apiKey: process.env.PINECONE_API_KEY,
        environment: process.env.PINECONE_ENV,
    });

    const index = client.Index(PINECONE_INDEX);

    // Query Pinecone for the given team
    const queryResponse = await index.query({
        topK: 1,  // Get the most relevant result
        includeMetadata: true,
        vector: [Math.random()], // Dummy vector (adjust if needed)
        filter: { home: team }, // Match the home team
    });

    if (queryResponse.matches.length === 0) {
        throw new Error(`No betting data found for ${team}`);
    }

    return queryResponse.matches[0].metadata;
}

// 📊 Generate insights based on retrieved data
export async function getBettingInsights(team: string) {
    try {
        // Fetch data from Pinecone
        const data = await fetchDataFromPinecone(team);

        let insights = `📊 **Betting Insights for ${team}** 📊\n`;
        insights += `**Spread:** ${data.spread}\n`;
        insights += `**Moneyline:** ${data.moneyline}\n`;
        insights += `**Offensive Rating:** ${data.offensiveRating}\n`;
        insights += `**Defensive Rating:** ${data.defensiveRating}\n`;
        insights += `**Pace:** ${data.pace}\n`;
        insights += `**Injuries:** ${data.injuries}\n`;
        insights += `**Public Betting Consensus:** ${data.bettingTrend}\n`;

        return insights;
    } catch (error) {
        console.error("Error fetching betting insights:", error);
        return `⚠️ Sorry, I couldn't fetch betting insights for ${team} at the moment.`;
    }
}
