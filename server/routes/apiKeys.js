const pool = require("../db");
const express = require("express");
const router = express.Router();


router.get("/getMapboxKey", async (req, res) => {
    try {
        const mapboxKey = await pool.query("SELECT * FROM apikeys WHERE api = 'mapbox'");
        res.json(mapboxKey.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;