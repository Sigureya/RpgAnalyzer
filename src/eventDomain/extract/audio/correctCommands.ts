import {
  collectMapEvents,
  isAudioCommand,
  processCommonEvents,
  processTroopEvents,
} from "@sigureya/rpg-data-tools";
import type {
  Data_CommonEvent,
  Data_Troop,
  EventCommand,
  Map_Audios,
  MapEventContainer,
  MapFileInfo,
} from "@sigureya/rpgtypes";
import type { MapAudioList } from "./types";
import type {
  AudioCommandInfoWithLocation,
  AudioResourcePath,
} from "./eventCommand";
import { audioCommandInfo, audioPathFromCommands } from "./eventCommand";

export const collectAudioCommands = (
  page: { list: EventCommand[] },
  pageIndex: number,
  event: { id: number }
): AudioCommandInfoWithLocation[] => {
  return page.list
    .filter(isAudioCommand)
    .map<AudioCommandInfoWithLocation>((command) => ({
      code: command.code,
      path: audioPathFromCommands(command),
      pageIndex,
      eventId: event.id,
    }));
};

export const extractAudioCommandsInfo = (
  list: ReadonlyArray<EventCommand>
): {
  code: number;
  path: AudioResourcePath;
}[] => {
  return list.filter(isAudioCommand).map(audioCommandInfo);
};

export const extractAudioCFromCommonEvents = (
  events: ReadonlyArray<Data_CommonEvent>
): AudioCommandInfoWithLocation[] => {
  return processCommonEvents(events, collectAudioCommands).flat(2);
};

export const expectAudioFromTroop = (
  troops: ReadonlyArray<Data_Troop>
): AudioCommandInfoWithLocation[] => {
  return processTroopEvents(troops, collectAudioCommands).flat(2);
};
type MapType = Map_Audios & MapEventContainer<EventCommand>;
export const extractAudioFromMap = (map: MapType): MapAudioList => {
  return {
    bgm: map.bgm,
    bgs: map.bgs,
    commands: collectMapEvents(map, collectAudioCommands),
  };
};
export const extractAudioFromMapFileInfo = <Map extends MapType>(
  map: MapFileInfo<Map>
): MapFileInfo<MapAudioList> => {
  return {
    map: extractAudioFromMap(map.map),
    filename: map.filename,
    editingName: map.editingName,
  };
};
