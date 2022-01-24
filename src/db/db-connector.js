const sqlite3 = require('sqlite3').verbose();

// Estabilish new database connection.
const db = new sqlite3.Database('routing.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error(err);
  }
  console.log('New database connection.');
});

// Create routing table.
db.run(`
  CREATE TABLE IF NOT EXISTS source_path (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    source_path TEXT,
    destination_url TEXT
  )
`);

// Query function for export.
async function get(sql = 'SELECT 7', params = []) {
  try {
    const result = await new Promise((resolve, reject) => {
      db.all(sql, params, (err, rows) => {
        if (err) reject(err)
        resolve(rows)
      });    
    })
    return Promise.resolve(result);
  } catch (error) {
    return Promise.reject(error)
  }
}

async function run(sql = 'SELECT 7', params = []) {
  try {
    const result = await new Promise((resolve, reject) => {
      db.run(sql, params, (err, cb) => {
        if (err) reject(err)
        resolve()
      });    
    })    
    return Promise.resolve(result);
  } catch (error) {
    return Promise.reject(error)
  }
}

module.exports = {
  get, run
}
