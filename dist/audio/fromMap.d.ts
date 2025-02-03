import { EventCommand, Map_Audios, MapEventContainer } from '@sigureya/rpgtypes';
import { AudioCommandInfo } from './resourcePath';
import { MapAudioList } from './types';
export declare const collectAudioCommands: (page: {
    list: EventCommand[];
}, pageIndex: number, event: {
    id: number;
}) => AudioCommandInfo[];
export declare const extractAudioFromMap: (map: Map_Audios & MapEventContainer<EventCommand>) => MapAudioList;
