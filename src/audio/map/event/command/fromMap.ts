import { collectMapEvents } from "@sigureya/rpg-data-tools";
import type {
  EventCommand,
  Map_Audios,
  MapEventContainer,
} from "@sigureya/rpgtypes";
import type { AudioCommandInfo } from "./resourcePath";
import { audioPathFromCommands, isAudioCommand } from "./resourcePath";
import type { AudioList } from "./types";

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

export const extractAudioFromMap = (
  map: Map_Audios & MapEventContainer<EventCommand>
): AudioList => {
  return {
    bgm: map.bgm,
    bgs: map.bgs,
    commands: collectMapEvents(map, collectAudioCommands),
  };
};
