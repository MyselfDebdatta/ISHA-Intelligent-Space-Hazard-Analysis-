const express = require("express");
const db = require("../config/sqlite");
const auth = require("../middleware/auth");

const router = express.Router();

/* ADD TO WATCHLIST */
router.post("/", auth, (req, res) => {
  const { asteroid } = req.body;

  db.prepare(`
    INSERT INTO watchlist 
    (user_id, asteroid_id, name, risk_level, diameter, miss_distance, velocity)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(
    req.user.id,
    asteroid.id,
    asteroid.name,
    asteroid.risk,
    asteroid.diameter,
    asteroid.missDistance,
    asteroid.velocity
  );

  res.json({ message: "Asteroid added to watchlist ⭐" });
});

/* REMOVE FROM WATCHLIST */
router.delete("/:asteroidId", auth, (req, res) => {
  db.prepare(`
    DELETE FROM watchlist 
    WHERE user_id = ? AND asteroid_id = ?
  `).run(req.user.id, req.params.asteroidId);

  res.json({ message: "Asteroid removed ❌" });
});

/* GET USER WATCHLIST */
router.get("/", auth, (req, res) => {
  const data = db.prepare(`
    SELECT * FROM watchlist WHERE user_id = ?
  `).all(req.user.id);

  res.json(data);
});

module.exports = router;
