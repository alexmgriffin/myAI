const axios = require("axios");

async function getNBABettingOdds(team) {
    try {
        const response = await axios.get("https://www.sportsbookreview.com/betting-odds/nba-basketball/", {
            headers: {
                "User-Agent": "Mozilla/5.0"
            }
        });

        return {
            home_team: "Pacers",
            away_team: "Lakers",
            odds: "-110"
        }; // Replace with actual scraped data
    } catch (error) {
        console.error("Error fetching betting odds:", error);
        return { error: "Failed to fetch data" };
    }
}

module.exports = { getNBABettingOdds };
