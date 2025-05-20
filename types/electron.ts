export enum MainProcessChannel {
  TO_MAIN = "toMainProcess",
}

export enum MainProcessEventName {
  REALM_CAR_INSERT = "insert",
  REALM_CAR_QUERY = "query",
  REALM_CAR_DELETE = "delete",
  REALM_CAR_UPDATE = "update",
}

export type carItem = {
  make: string;
  model: string;
  miles: number;
};

export type insertMainArgs = {
  carlist: carItem[];
};
export type deleteMainArgs = {};
export type updateMainArgs = {};

export type BaseMainArgsMap = {
  [MainProcessEventName.REALM_CAR_INSERT]: insertMainArgs;
  [MainProcessEventName.REALM_CAR_UPDATE]: deleteMainArgs;
  [MainProcessEventName.REALM_CAR_DELETE]: updateMainArgs;
  [MainProcessEventName.REALM_CAR_QUERY]: Record<string, unknown>;
};

export type MainArgs = {
  [K in keyof BaseMainArgsMap]: {
    name: K;
    data: BaseMainArgsMap[K];
  };
}[keyof BaseMainArgsMap];
