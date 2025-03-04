import axios from "axios";

const NBA_API_URL = "https://api-nba-v1.p.rapidapi.com/players/statistics?game=8133";
const ODDS_API_URL = "https://api.the-odds-api.com/v4/sports/basketball_nba/odds/";

const NBA_API_KEY = "d4d41e847bmshad26c7c81df2647p190a9cjsn54018f6a4f35";
const ODDS_API_KEY = "7a1e47dab792fbb1b4249717ec6e55a2"; 

// Fetch recent game stats for a team
export async function getTeamStats(team: string) {
    const response = await axios.get(NBA_API_URL, {
        headers: { "X-RapidAPI-Key": NBA_API_KEY },
        params: { season: "2024", team }
    });

    const games = response.data.response;

return games.slice(0, 5).map((game: { 
    teams: { away: { name: string } }, 
    scores: any, 
    date: string 
}) => ({
    opponent: game.teams.away.name,
    score: game.scores,
    date: game.date
}));

// Fetch betting odds for a team
export async function getBettingOdds(team: string) {
    const response = await axios.get(ODDS_API_URL, {
        params: { apiKey: ODDS_API_KEY, regions: "us", markets: "h2h,spreads" }
    });

    return response.data.filter(game => game.home_team === team || game.away_team === team);
}

// Generate betting insights
export async function getBettingInsights(team: string) {
    const teamStats = await getTeamStats(team);
    const odds = await getBettingOdds(team);

    let analysis = `Recent performance for ${team}:\n`;
    teamStats.forEach(game => {
        analysis += `- Vs ${game.opponent} on ${game.date}: Score ${game.score}\n`;
    });

    analysis += `\nCurrent betting odds:\n`;
    odds.forEach(game => {
        analysis += `- ${game.home_team} vs ${game.away_team}: Spread ${game.bookmakers[0].markets[0].outcomes[0].point}\n`;
    });

    return analysis;
