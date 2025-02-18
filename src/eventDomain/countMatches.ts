import type { ResourcePath } from "./resourceTag/types";

const createKey = <F extends string>(
  folderName: F,
  filePath: string,
  separator: string = ":"
) => {
  return `${folderName}${separator}${filePath}`;
};
export const generatePathSet = <
  Folder extends string,
  Path extends ResourcePath<Folder>
>(
  list: ReadonlyArray<Path>,
  separator: string = ":"
): Set<string> => {
  return new Set(
    list.map((path) => createKey(path.folderName, path.fileName, separator))
  );
};

export const countMatches = <T, Key extends string | number>(
  list: ReadonlyArray<T>,
  set: ReadonlySetLike<Key>,
  keyFunc: (item: T) => Key
): number => {
  return list.reduce((acc, item) => {
    const key = keyFunc(item);
    const v = set.has(key) ? 1 : 0;
    return acc + v;
  }, 0);
};
