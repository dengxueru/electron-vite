import { createRequire } from "node:module";
const require = createRequire(import.meta.url);

class Database {
  constructor() {
    const sqlite3 = require("sqlite3").verbose(); // 导入并启用详细模式
  }
}

export default Database;
