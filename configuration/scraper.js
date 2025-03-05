const axios = require("axios");
const cheerio = require("cheerio");
const moment = require("moment");

const NBA_ODDS_URL = "https://www.actionnetwork.com/nba/odds";
const NBA_STATS_URL = "https://www.basketball-reference.com/leagues/NBA_2024.html";
const NBA_INJURIES_URL = "https://www.espn.com/nba/injuries";
const NBA_BETTING_TRENDS_URL = "https://www.oddsshark.com/nba/consensus-picks";

// 🏀 Fetches NBA odds (spread, moneyline)
async function getNBAOdds() {
    try {
        const response = await axios.get(NBA_ODDS_URL);
        const $ = cheerio.load(response.data);

        let oddsData = [];

        $(".sportsbook-odds").each((index, element) => {
            const homeTeam = $(element).find(".home-team").text().trim();
            const awayTeam = $(element).find(".away-team").text().trim();
            const spread = $(element).find(".spread").text().trim();
            const moneyline = $(element).find(".moneyline").text().trim();

            oddsData.push({
                home: homeTeam,
                away: awayTeam,
                spread: spread,
                moneyline: moneyline,
            });
        });

        return oddsData;
    } catch (error) {
        console.error("Error fetching NBA odds:", error);
        return [];
    }
}

// 📊 Fetches NBA team stats
async function getNBAStats() {
    try {
        const response = await axios.get(NBA_STATS_URL);
        const $ = cheerio.load(response.data);

        let stats = [];

        $("table.stats_table tbody tr").each((index, element) => {
            const team = $(element).find("td[data-stat=team_name] a").text().trim();
            const offensiveRating = $(element).find("td[data-stat=off_rtg]").text().trim();
            const defensiveRating = $(element).find("td[data-stat=def_rtg]").text().trim();
            const pace = $(element).find("td[data-stat=pace]").text().trim();

            stats.push({
                team: team,
                offensiveRating: offensiveRating,
                defensiveRating: defensiveRating,
                pace: pace,
            });
        });

        return stats;
    } catch (error) {
        console.error("Error fetching NBA stats:", error);
        return [];
    }
}

// 🚑 Fetches NBA injury reports
async function getNBAInjuries() {
    try {
        const response = await axios.get(NBA_INJURIES_URL);
        const $ = cheerio.load(response.data);

        let injuries = [];

        $(".Table__TBODY tr").each((index, element) => {
            const team = $(element).find("td:nth-child(1)").text().trim();
            const player = $(element).find("td:nth-child(2)").text().trim();
            const status = $(element).find("td:nth-child(3)").text().trim();
            const injury = $(element).find("td:nth-child(4)").text().trim();
            const date = moment($(element).find("td:nth-child(5)").text().trim(), "MMM D").format("YYYY-MM-DD");

            injuries.push({
                team: team,
                player: player,
                status: status,
                injury: injury,
                date: date,
            });
        });

        return injuries;
    } catch (error) {
        console.error("Error fetching NBA injuries:", error);
        return [];
    }
}

// 📈 Fetches NBA betting trends
async function getNBABettingTrends() {
    try {
        const response = await axios.get(NBA_BETTING_TRENDS_URL);
        const $ = cheerio.load(response.data);

        let trends = [];

        $(".consensus-picks").each((index, element) => {
            const team = $(element).find(".team-name").text().trim();
            const consensus = $(element).find(".consensus-percentage").text().trim();

            trends.push({
                team: team,
                consensus: consensus,
            });
        });

        return trends;
    } catch (error) {
        console.error("Error fetching NBA betting trends:", error);
        return [];
    }
}

module.exports = { getNBAOdds, getNBAStats, getNBAInjuries, getNBABettingTrends };
