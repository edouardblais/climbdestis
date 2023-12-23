const pool = require("../db");
const express = require("express");
const router = express.Router();

router.get("/getAll", async (req, res) => {
    try {
        const allDestinations = await pool.query("SELECT * from destis");
        res.json(allDestinations.rows)
    } catch (err) {
        console.error(err.message)
    }
});

router.get("/getByArea", async (req, res) => {
    try {
        const {area} =  req.params
        const destinationsByArea = await pool.query("SELECT * from destis WHERE area = $1", [area]);
        res.json(destinationsByArea.rows)
    } catch (err) {
        console.error(err.message)
    }
});

router.get("/getByDestination", async (req, res) => {
    try {
        const {destination_id} =  req.params
        const destination = await pool.query("SELECT * from destis WHERE destination = $1", [destination_id]);
        res.json(destination.rows[0])
    } catch (err) {
        console.error(err.message)
    }
});

module.exports = router;