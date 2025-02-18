import type { ImageFolders } from "@sigureya/rpgtypes";

export interface ResourcePath<Folder extends string = string> {
  folderName: Folder;
  fileName: string;
}

export interface ResourceTagEx<T> {
  tagName: string;
  baseFolder: string;
  list: T[];
  assets: unknown;
}

export interface ImageResourcePath {
  folder: ImageFolders;
  fileName: string;
}

const xxxx = () => {};
