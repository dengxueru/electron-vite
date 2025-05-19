import { createRequire } from "node:module";
const require = createRequire(import.meta.url);

const RealmDB = require("realm");
import type { Configuration, ObjectSchema } from "realm";

class Database {
  constructor() {
    this.init();

    // const sqlite3 = require("sqlite3").verbose(); // 导入并启用详细模式
  }

  async init() {
    class Car extends RealmDB.Object<Car> {
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

    const config: Configuration = {
      schema: [Car.schema],
    };
    const realm = await RealmDB.open(config);

    realm.write(() => {
      realm.create("Car", {
        make: "benchi",
        model: "glc",
        miles: 10000,
      });
    });
    // const obj = realm.objects("Car");
    // console.log(obj);
    // const myTask = realm.objectForPrimaryKey(
    //   "Car",
    //   new Realm.BSON.ObjectId("682ace83df2699dd89312d58")
    // );
    // console.log(myTask);
  }
}

export default Database;
