import { EventCommand, MapEvent, MapEventPage } from '@sigureya/rpgtypes';
import { ExtractedCommandInfos, ExtractedMapEvent, ExtractedMapEventPage } from './types';
export declare const extractMapEvent: (event: MapEvent) => ExtractedMapEvent;
export declare const extractPageInfo: (page: MapEventPage) => ExtractedMapEventPage;
export declare const extractEventCommandData: (list: ReadonlyArray<EventCommand>) => ExtractedCommandInfos;
