import axios from "axios";

const NBA_API_URL = "https://api-nba-v1.p.rapidapi.com/players/statistics?game=8133";
const ODDS_API_URL = "https://api.the-odds-api.com/v4/sports/basketball_nba/odds/";

const NBA_API_KEY = "YOUR_NBA_API_KEY_HERE";  // Replace with actual key
const ODDS_API_KEY = "YOUR_ODDS_API_KEY_HERE";  // Replace with actual key

// Fetch recent game stats for a team
export async function getTeamStats(team: string) {
    const response = await axios.get(NBA_API_URL, {
        headers: { "X-RapidAPI-Key": NBA_API_KEY },
        params: { season: "2024", team }
    });

    const games = response.data.response || [];

    return games.slice(0, 5).map((game: { teams: { away: { name: string } }, scores: any, date: string }) => ({
        opponent: game.teams.away.name,
        score: game.scores,
        date: game.date
    }));
}

// Fetch betting odds for a team
export async function getBettingOdds(team: string) {
    const response = await axios.get(ODDS_API_URL, {
        params: { apiKey: ODDS_API_KEY, regions: "us", markets: "h2h,spreads" }
    });

    const filteredGames = response.data.filter((game: { home_team: string; away_team: string }) =>
        game.home_team === team || game.away_team === team
    );

    return filteredGames;
}

// Generate betting insights
export async function getBettingInsights(team: string) {
    const teamStats = await getTeamStats(team);
    const odds = await getBettingOdds(team);

    let analysis = `Recent performance for ${team}:\n`;

    teamStats.forEach((game: { opponent: string; date: string; score: string }) => {
        analysis += `- Vs ${game.opponent} on ${game.date}: Score ${game.score}\n`;
    });

    analysis += `\nCurrent betting odds:\n`;

    if (!Array.isArray(odds)) {
        analysis += "No betting data available.\n";
    } else {
        odds.forEach((game: { home_team: string; away_team: string; bookmakers?: any[] }) => {
            if (game.bookmakers && game.bookmakers.length > 0) {
                analysis += `- ${game.home_team} vs ${game.away_team}: Spread ${game.bookmakers[0].markets[0].outcomes[0].point}\n`;
            } else {
                analysis += `- ${game.home_team} vs ${game.away_team}: No available odds.\n`;
            }
        });
    }

    return analysis;
}
