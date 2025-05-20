import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const RealmDB = require("realm");

import { Car } from "./type";
import type { Realm, Configuration } from "realm";
import { carItem } from "../types/electron";

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
  insert(list: carItem[]) {
    this.realm.write(() => {
      list.forEach((item) => {
        this.realm.create(Car.schema.name, item);
      });
    });
  }

  // 查询列表
  query() {
    const list = this.realm.objects(Car.schema.name);
    console.log(list);
  }
}

export default new CarDatabase();
