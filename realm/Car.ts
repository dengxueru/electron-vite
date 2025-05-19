import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const RealmDB = require("realm");

import { Car } from "./type";
import type { Realm, Configuration } from "realm";

class CarDatabase {
  realm: Realm;

  constructor() {
    this.init();
  }

  async init() {
    const config: Configuration = {
      schema: [Car.schema],
    };
    this.realm = await RealmDB.open(config);
  }

  // 插入单条数据
  insert() {
    this.realm.write(() => {
      this.realm.create(Car.schema.name, {
        make: "benchi",
        model: "glc",
        miles: 10000,
      });
    });
  }

  // 查询列表
  query() {
    this.realm.objects(Car.schema.name);
  }
}

export default new CarDatabase();
