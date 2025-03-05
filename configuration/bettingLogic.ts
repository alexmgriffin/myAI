export async function getBettingInsights(team: string) {
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
}
