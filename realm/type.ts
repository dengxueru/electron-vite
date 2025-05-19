import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const RealmDB = require("realm");

import type { ObjectSchema } from "realm";

export class Car extends RealmDB.Object<Car> {
  _id!: Realm.BSON.ObjectId;
  make!: string;
  model!: string;
  miles?: number;

  static schema: ObjectSchema = {
    name: "Car",
    primaryKey: "_id",
    properties: {
      _id: { type: "objectId", default: () => new RealmDB.BSON.ObjectId() },
      make: "string",
      model: "string",
      miles: "int?",
    },
  };
}
