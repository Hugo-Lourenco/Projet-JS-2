const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'labyrinthes.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Erreur de connexion à SQLite :", err.message);
    } else {
        console.log("Connexion réussie à la base de données SQLite.");
        
        db.serialize(() => {
            db.run(`CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                is_admin BOOLEAN DEFAULT 0
            )`);

            db.run(`CREATE TABLE IF NOT EXISTS mazes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                difficulty INTEGER NOT NULL,
                grid_data TEXT NOT NULL, 
                FOREIGN KEY (user_id) REFERENCES users (id)
            )`);
            
            console.log("Tables 'users' et 'mazes' prêtes.");
        });
    }
});
module.exports = db;