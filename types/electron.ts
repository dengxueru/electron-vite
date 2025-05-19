export enum MainProcessChannel {
  TO_MAIN = "toMainProcess",
}

export enum MainProcessEventName {
  REALM_CAR_INSERT = "insert",
  REALM_CAR_QUERY = "query",
  REALM_CAR_DELETE = "delete",
  REALM_CAR_UPDATE = "update",
}

export type insertMainArgs = {
  carlist: [];
};
export type queryMainArgs = {};
export type deleteMainArgs = {};
export type updateMainArgs = {};

export type BaseMainArgsMap = {
  [MainProcessEventName.REALM_CAR_INSERT]: insertMainArgs;
  [MainProcessEventName.REALM_CAR_QUERY]: queryMainArgs;
  [MainProcessEventName.REALM_CAR_UPDATE]: deleteMainArgs;
  [MainProcessEventName.REALM_CAR_DELETE]: updateMainArgs;
};

export type BaseMainArgs = {
  [K in keyof BaseMainArgsMap]: {
    name: K;
    data: BaseMainArgsMap[K];
  };
}[keyof BaseMainArgsMap];
