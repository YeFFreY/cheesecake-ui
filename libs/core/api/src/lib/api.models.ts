export type ResourceId = string;

export interface Resource {
  id: ResourceId;
}


export interface CommandResult<T> {
  data: T;
}

export interface QueryResult<T> {
  data: T;
}
