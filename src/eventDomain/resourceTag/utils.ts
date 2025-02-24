import type { ResourcePath } from "./types";
import type { AssetRecord, AssetStore } from "./types2";

export const generateKey = (path: ResourcePath) => {
  return `${path.folderName}:${path.fileName}`;
};
export const addAsset = <T, S extends string>(
  store: AssetStore<T, S>,
  data: T,
  state: S,
  fn: (data: T) => string
): AssetStore<T, S> => {
  const key = fn(data);
  return { ...store, [key]: { data, state } };
};
export const addAssets = <T, S extends string>(
  store: AssetStore<T, S>,
  data: T[],
  state: S,
  fn: (data: T) => string
): AssetStore<T, S> => {
  return data.reduce((acc, item) => addAsset(acc, item, state, fn), store);
};

export const getAsset = <T, S extends string>(
  store: AssetStore<T, S>,
  data: T,
  fn: (data: T) => string
): AssetRecord<T, S> | undefined => {
  return store[fn(data)];
};

export const removeAsset = <T, S extends string>(
  store: AssetStore<T, S>,
  data: T,
  fn: (data: T) => string
): AssetStore<T, S> => {
  const key = fn(data);
  const { [key]: _, ...rest } = store;
  return rest;
};
export const filterByState = <T, S extends string>(
  store: AssetStore<T, S>,
  state: S
): AssetRecord<T, S>[] => {
  return Object.values(store).filter((value) => value.state === state);
};
