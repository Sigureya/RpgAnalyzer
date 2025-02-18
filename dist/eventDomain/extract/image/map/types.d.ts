import { Data_Map, Data_NamedItem, EventCommand, ImageFolders, MapEventContainer, MapEventPage } from '@sigureya/rpgtypes';
import { ImageCommandInfo } from './eventCommand';
export type ImageExtractableEventPage = Pick<MapEventPage, "image" | "list">;
export type ImageExtractableMap = Pick<Data_Map, "battleback1Name" | "battleback2Name" | "parallaxName"> & MapEventContainer<EventCommand, Data_NamedItem & {
    pages: ImageExtractableEventPage;
}>;
export interface ImageResourcePath {
    folderName: ImageFolders;
    fileName: string;
}
export interface ExtractedMapImages {
    background1: ImageResourcePath;
    background2: ImageResourcePath;
    parallax: ImageResourcePath;
    commands: ImageCommandInfo[];
}
