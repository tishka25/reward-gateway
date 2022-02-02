export type Action = { type: any, payload?: any };
export type Dispacher = (params: Action) => any;