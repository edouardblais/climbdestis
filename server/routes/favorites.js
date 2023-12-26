const pool = require("../db");
const express = require("express");
const router = express.Router();
const authorize = require("../middleware/authorize");

router.get("/getFavorites/:user_id", authorize, async (req, res) => {
    const { user_id } = req.params;
    
    try {
        const query = `
        SELECT d.*
        FROM user_favorites uf
        JOIN destis d ON uf.destis_id = d.id
        WHERE uf.user_id = $1;
        `;

        const result = await pool.query(query, [user_id]); 
        res.json(result.rows);
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server error");
    }
});

module.exports = router;