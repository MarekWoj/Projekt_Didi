const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('gymflow.db', (err) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log("Connected to SQLite database");

        db.run(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                surname TEXT,
                email TEXT UNIQUE,
                password TEXT,
                role TEXT DEFAULT 'user'
            )
        `);
    }
});

module.exports = db;
