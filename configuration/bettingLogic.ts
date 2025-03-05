import { Pinecone } from "@pinecone-database/pinecone";

// Hardcoded Pinecone Credentials (Replace with your actual values)
const PINECONE_API_KEY = "pcsk_fkUEu_UkJhwrMid7t5kG36CGXg9zMwyeRDiGKNMw8PwMEJSgmPtuSw43NbTCMTF7eGct9";
const PINECONE_ENV = "us-east-1"; // Example: "us-east1-gcp"
const PINECONE_INDEX = "my-ai";

  // Initialize Pinecone
const pinecone = new Pinecone({
  apiKey: PINECONE_API_KEY,
});

export async function getBettingInsights(team: string) {
  try {
    const index = pinecone.Index(PINECONE_INDEX); // Corrected syntax
    const query = await index.query({
      topK: 1, // Get the most relevant betting data
      includeValues: true,
      vector: [team.toLowerCase().charCodeAt(0)], // Simple vectorization example
    });

    if (!query.matches || query.matches.length === 0) {
      return `❌ No betting data available for ${team}.`;
    }

    const data = query.matches[0].metadata;

    // Construct response based on retrieved data
    let insights = `📊 **Betting Insights for ${team}** 📊\n`;
    insights += `**Matchup:** ${data.away_team} vs ${data.home_team}\n`;
    insights += `**Latest Odds:** ${data.odds}\n`;
    insights += `**Injury Report:** ${data.injuries}\n`;
    insights += `**Recent Form:** ${data.trends}\n`;
    insights += `**Key Player Stats:** ${data.player_stats}\n`;

    return insights;
  } catch (error) {
    console.error("Error fetching betting insights:", error);
    return "⚠️ Sorry, I couldn't fetch betting insights at the moment.";
  }
}
