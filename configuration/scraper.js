const puppeteer = require('puppeteer');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

async function getNBABettingOdds() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto("https://www.vegasinsider.com/nba/odds/", { waitUntil: "domcontentloaded" });

    const odds = await page.evaluate(() => {
        let games = [];
        document.querySelectorAll('.odds-row').forEach(row => {
            let teams = row.querySelectorAll('.team-name');
            let odds = row.querySelectorAll('.odds-value');
            if (teams.length === 2 && odds.length > 0) {
                games.push({
                    team1: teams[0].innerText.trim(),
                    team2: teams[1].innerText.trim(),
                    odds: odds[0].innerText.trim()
                });
            }
        });
        return games;
    });

    await browser.close();
    return odds;
}

// API Endpoint
app.get('/odds', async (req, res) => {
    try {
        const data = await getNBABettingOdds();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch odds" });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🟢 Scraper running on http://localhost:${PORT}/odds`));
