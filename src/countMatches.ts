import type { ResourcePath } from "./resourceTag/types";

const createKey = <F extends string>(
  folderName: F,
  filePath: string,
  separator: string = ":"
) => {
  // 書式を固定するためにas constを付けてる。戻り値に書くと二度手間になる。
  return `${folderName}${separator}${filePath}` as const;
};
export const generatePathSet = <Path extends ResourcePath>(
  list: ReadonlyArray<Path>,
  separator: string = ":"
) => {
  return new Set(
    list.map((path) => createKey(path.folderName, path.fileName, separator))
  );
};

export const countMatches = <T, Key extends string | number>(
  list: ReadonlyArray<T>,
  set: ReadonlySet<Key>,
  keyFunc: (item: T) => Key
): number => {
  return list.reduce((acc, item) => {
    const key = keyFunc(item);
    const v = set.has(key) ? 1 : 0;
    return acc + v;
  }, 0);
};
