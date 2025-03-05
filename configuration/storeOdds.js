const { PineconeClient } = require("@pinecone-database/pinecone");
const { getNBAOdds, getNBAStats, getNBAInjuries, getNBABettingTrends } = require("./scraper");

const PINECONE_INDEX = "nba-betting-odds";

async function storeNBAData() {
    const client = new PineconeClient();
    await client.init({
        apiKey: process.env.PINECONE_API_KEY,
        environment: process.env.PINECONE_ENV,
    });

    const index = client.Index(PINECONE_INDEX);
    const nbaOdds = await getNBAOdds();
    const nbaStats = await getNBAStats();
    const nbaInjuries = await getNBAInjuries();
    const nbaTrends = await getNBABettingTrends();

    let vectors = nbaOdds.map((game, i) => {
        const stats = nbaStats.find((s) => s.team === game.home) || {};
        const injuries = nbaInjuries.filter((inj) => inj.team === game.home);
        const trends = nbaTrends.find((t) => t.team === game.home) || {};

        return {
            id: `game_${i}`,
            values: [Math.random()],
            metadata: {
                home: game.home,
                away: game.away,
                spread: game.spread,
                moneyline: game.moneyline,
                offensiveRating: stats.offensiveRating || "N/A",
                defensiveRating: stats.defensiveRating || "N/A",
                pace: stats.pace || "N/A",
                injuries: injuries.map((inj) => `${inj.player} (${inj.status})`).join(", "),
                bettingTrend: trends.consensus || "N/A",
            },
        };
    });

    await index.upsert(vectors);
    console.log("Stored live NBA data in Pinecone!");
}

storeNBAData();
