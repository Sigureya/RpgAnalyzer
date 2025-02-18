import { ImageFolders } from '@sigureya/rpgtypes';
export interface ResourcePath {
    folderName: string;
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
