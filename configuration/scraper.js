const axios = require("axios");

async function getNBABettingOdds(team) {
    try {
        const response = await axios.get("https://www.example.com/api/odds"); // Replace with actual odds site URL

        return {
            home_team: response.data.home_team,
            away_team: response.data.away_team,
            odds: response.data.odds,
        };
    } catch (error) {
        console.error("Error fetching betting odds:", error);
        return { error: true };
    }
}

module.exports = { getNBABettingOdds };
