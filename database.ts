import { createRequire } from "node:module";
const require = createRequire(import.meta.url);

const sqlite3 = require("sqlite3").verbose();

class Database {
  constructor() {
    const db = new sqlite3.Database("./sqlite3.node");

    db.serialize(() => {
      db.run("CREATE TABLE lorem (info TEXT)");

      const stmt = db.prepare("INSERT INTO lorem VALUES (?)");
      for (let i = 0; i < 10; i++) {
        stmt.run("Ipsum " + i);
      }
      stmt.finalize();

      db.each("SELECT rowid AS id, info FROM lorem", () => {});
    });

    db.close();
  }

  async init() {}
}

export default Database;
