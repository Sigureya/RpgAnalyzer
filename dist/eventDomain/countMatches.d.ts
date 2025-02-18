import { ResourcePath } from './resourceTag/types';
export declare const generatePathSet: <Path extends ResourcePath>(list: ReadonlyArray<Path>, separator?: string) => Set<string>;
export declare const countMatches: <T, Key extends string | number>(list: ReadonlyArray<T>, set: ReadonlySetLike<Key>, keyFunc: (item: T) => Key) => number;
