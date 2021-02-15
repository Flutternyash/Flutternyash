const Database = require('better-sqlite3');
const {join} = require('path');
const db = new Database(join(__dirname, '../data/main.db'));

db.pragma('synchronous = 1');
db.pragma('journal_mode = wal');

db.prepare(`
  CREATE TABLE IF NOT EXISTS settings (
    guild_id TEXT PRIMARY KEY,
    guild_name TEXT,
    prefix TEXT DEFAULT "" NOT NULL
  )
`).run();

const settings = {
  insertRow: db.prepare(`
    INSERT OR IGNORE INTO settings (
      guild_id,
      guild_name
    ) VALUES (?, ?);
  `),
  //Выборка данных
  selectRow: db.prepare(`SELECT * FROM settings WHERE guild_id = ?;`),
  selectGuilds: db.prepare('SELECT guild_name, guild_id FROM settings'),
  selectPrefix: db.prepare('SELECT prefix FROM settings WHERE guild_id = ?;'),

  //Обновление данных
  updatePrefix: db.prepare(`UPDATE settings SET prefix = ? WHERE guild_id = ?;`),
  updateGuildName: db.prepare(`UPDATE settings SET guild_name = ? WHERE guild_id = ?;`),

  //удаление
  deleteGuild: db.prepare(`DELETE FROM settings WHERE guild_id = ?;`)
};

module.exports = {
  settings
};
