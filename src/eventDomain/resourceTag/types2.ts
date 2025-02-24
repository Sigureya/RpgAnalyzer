export interface AssetRecord<T, State extends string> {
  state: State;
  data: T;
}

export type AssetStore<T, S extends string> = Record<string, AssetRecord<T, S>>;
