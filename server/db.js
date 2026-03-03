const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./expense.db", (err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to SQLite");

    db.run(`
      CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT,
        amount REAL,
        category TEXT,
        note TEXT,
        date TEXT
      )
    `);
  }
});

module.exports = db;
