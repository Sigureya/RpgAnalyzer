import {
  collectMapEvents,
  processCommonEvents,
  processTroopEvents,
} from "@sigureya/rpg-data-tools";
import type {
  Data_CommonEvent,
  Data_Troop,
  EventCommand,
  Map_Audios,
  MapEventContainer,
} from "@sigureya/rpgtypes";
import type { AudioCommandInfo } from "./resourcePath";
import { audioPathFromCommands, isAudioCommand } from "./resourcePath";
import type { MapAudioList } from "./types";

export const collectAudioCommands = (
  page: { list: EventCommand[] },
  pageIndex: number,
  event: { id: number }
): AudioCommandInfo[] => {
  return page.list.filter(isAudioCommand).map<AudioCommandInfo>((command) => ({
    code: command.code,
    path: audioPathFromCommands(command),
    pageIndex,
    eventId: event.id,
  }));
};

export const extractAudioCFromCommonEvents = (
  events: ReadonlyArray<Data_CommonEvent>
): AudioCommandInfo[] => {
  return processCommonEvents(events, collectAudioCommands).flat(2);
};

export const expectAudioFromTroop = (
  troops: ReadonlyArray<Data_Troop>
): AudioCommandInfo[] => {
  return processTroopEvents(troops, collectAudioCommands).flat(2);
};

export const extractAudioFromMap = (
  map: Map_Audios & MapEventContainer<EventCommand>
): MapAudioList => {
  return {
    bgm: map.bgm,
    bgs: map.bgs,
    commands: collectMapEvents(map, collectAudioCommands),
  };
};
