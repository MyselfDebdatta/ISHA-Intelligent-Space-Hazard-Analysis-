const express = require("express");
const axios = require("axios");
const calculateRisk = require("../utils/riskCalculator");

const router = express.Router();

router.get("/today", async (req, res) => {
    try {
        const NASA_API_KEY = process.env.NASA_API_KEY;
        const url = `https://api.nasa.gov/neo/rest/v1/feed?api_key=${NASA_API_KEY}`;

        const response = await axios.get(url);
        const neoData = response.data.near_earth_objects;

        let results = [];

        for (let date in neoData) {
            neoData[date].forEach((asteroid) => {
                const analysedAsteroid = calculateRisk(asteroid);
                results.push(analysedAsteroid);
            });
        }

        res.json({
            count: results.length,
            asteroids: results
        });

    } catch (error) {
        res.status(500).json({ error: "Failed to fetch asteroid data" });
    }
});

module.exports = router;
