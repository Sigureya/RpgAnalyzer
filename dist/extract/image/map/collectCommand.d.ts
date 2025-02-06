import { Data_CommonEvent, Data_NamedItem, Data_Troop, EventCommand } from '@sigureya/rpgtypes';
import { ImageCommandInfo } from './eventCommand/';
import { ExtractedMapImages, ImageExtractableMap } from './types';
export declare const extractImagesFromTroop: (troops: ReadonlyArray<Data_Troop>) => ImageCommandInfo[];
export declare const extractImagesFromCommonEvents: (events: ReadonlyArray<Data_CommonEvent>) => ImageCommandInfo[];
export declare const extractTextFromMap: (map: ImageExtractableMap) => ExtractedMapImages;
export declare const collectImageCommands: (page: {
    list: EventCommand[];
}, pageIndex: number, event: Data_NamedItem) => ImageCommandInfo[];
