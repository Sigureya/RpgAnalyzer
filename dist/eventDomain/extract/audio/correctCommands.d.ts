import { Data_CommonEvent, Data_Troop, EventCommand, Map_Audios, MapEventContainer, MapFileInfo } from '@sigureya/rpgtypes';
import { MapAudioList } from './types';
import { AudioCommandInfoWithLocation, AudioResourcePath } from './eventCommand';
export declare const collectAudioCommands: (page: {
    list: EventCommand[];
}, pageIndex: number, event: {
    id: number;
}) => AudioCommandInfoWithLocation[];
export declare const extractAudioCommandsInfo: (list: ReadonlyArray<EventCommand>) => {
    code: number;
    path: AudioResourcePath;
}[];
export declare const extractAudioCFromCommonEvents: (events: ReadonlyArray<Data_CommonEvent>) => AudioCommandInfoWithLocation[];
export declare const expectAudioFromTroop: (troops: ReadonlyArray<Data_Troop>) => AudioCommandInfoWithLocation[];
type MapType = Map_Audios & MapEventContainer<EventCommand>;
export declare const extractAudioFromMap: (map: MapType) => MapAudioList;
export declare const extractAudioFromMapFileInfo: <Map extends MapType>(map: MapFileInfo<Map>) => MapFileInfo<MapAudioList>;
export {};
