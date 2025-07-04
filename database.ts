import { join } from "path";
import { app } from "electron";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const Database = require("better-sqlite3");

const dbPath = join(app.getPath("desktop"), "foobar.db");
console.log("DB Path:", dbPath);

const db = new Database(dbPath, { verbose: console.log });

// 创建表
db.exec(`
  CREATE TABLE IF NOT EXISTS cats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER NOT NULL
  )
`);

// 插入数据
const insert = db.prepare("INSERT INTO cats (name, age) VALUES (@name, @age)");

const insertMany = db.transaction((cats: any) => {
  for (const cat of cats) insert.run(cat);
});

insertMany([
  { name: "Joey", age: 2 },
  { name: "Sally", age: 4 },
  { name: "Junior", age: 1 },
]);

export default db;
