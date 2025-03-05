const { getNBABettingOdds } = require('./scraper');

async function getBettingInsights(team) {
    try {
        const odds = await getNBABettingOdds(team);
        
        if (odds.error) {
            return `No live betting data available for ${team}.`;
        }

        return `📊 **Betting Insights for ${team}** 📊\n
        **Matchup:** ${odds.away_team} vs ${odds.home_team}\n
        **Latest Odds:** ${odds.odds}`;
    } catch (error) {
        console.error("Error fetching odds:", error);
        return "⚠️ Sorry, I couldn't fetch betting insights at the moment.";
    }
}

module.exports = { getBettingInsights };

