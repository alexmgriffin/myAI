import Pinecone from "@pinecone-database/pinecone";

const PINECONE_INDEX = "nba-betting-odds";

// Initialize Pinecone
const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
    environment: process.env.PINECONE_ENV,
});

async function fetchDataFromPinecone(team: string) {
    const index = pinecone.index(PINECONE_INDEX);

    const queryResponse = await index.query({
        topK: 1,
        includeMetadata: true,
        vector: [Math.random()], // Replace with an actual vector if needed
        filter: { home: team },
    });

    if (!queryResponse.matches.length) {
        throw new Error(`No betting data found for ${team}`);
    }

    return queryResponse.matches[0].metadata;
}

export async function getBettingInsights(team: string) {
    try {
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
