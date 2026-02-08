const Database = require("better-sqlite3");

const db = new Database("database.db");

// create users table
db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    email TEXT UNIQUE,
    password TEXT
  )
`).run();

module.exports = db;

db.prepare(`
  CREATE TABLE IF NOT EXISTS watchlist (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    asteroid_id TEXT,
    name TEXT,
    risk_level TEXT,
    diameter REAL,
    miss_distance REAL,
    velocity REAL
  )
`).run();
