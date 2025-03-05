import { Pinecone } from "@pinecone-database/pinecone";

// Hardcoded Pinecone Credentials (Replace with your actual values)
const PINECONE_API_KEY = "pcsk_fkUEu_UkJhwrMid7t5kG36CGXg9zMwyeRDiGKNMw8PwMEJSgmPtuSw43NbTCMTF7eGct9";
const PINECONE_ENV = "us-east-1"; // Example: "us-east1-gcp"
const PINECONE_INDEX = "my-ai";

// Initialize Pinecone client
const pinecone = new Pinecone({
  apiKey: PINECONE_API_KEY,
});

/**
 * Fetch betting insights from Pinecone for a given team.
 */
export async function getBettingInsights(team: string) {
  try {
    const index = pinecone.Index(PINECONE_INDEX); // Ensure correct capitalization
    const query = await index.query({
      topK: 1, // Get the most relevant betting data
      includeValues: true,
      vector: [team.toLowerCase().charCodeAt(0)], // Simple vectorization example
    });

    // Ensure query returned valid results
    if (!query.matches || query.matches.length === 0 || !query.matches[0].metadata) {
      return `❌ No betting data available for ${team}.`;
    }

    const data = query.matches[0].metadata;

    // Construct response based on retrieved data
    let insights = `📊 **Betting Insights for ${team}** 📊\n`;

    insights += `**Matchup:** ${data.away_team ?? "Unknown"} vs ${data.home_team ?? "Unknown"}\n`;
    insights += `**Latest Odds:** ${data.odds ?? "Not available"}\n`;
    insights += `**Injury Report:** ${data.injuries ?? "Not available"}\n`;
    insights += `**Recent Form:** ${data.trends ?? "Not available"}\n`;
    insights += `**Key Player Stats:** ${data.player_stats ?? "Not available"}\n`;

    return insights;
  } catch (error) {
    console.error("Error fetching betting insights:", error);
    return "⚠️ Sorry, I couldn't fetch betting insights at the moment.";
  }
}
