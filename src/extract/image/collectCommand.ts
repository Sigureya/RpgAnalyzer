import {
  collectMapEvents,
  isImageCommand,
  processCommonEvents,
  processTroopEvents,
} from "@sigureya/rpg-data-tools";
import type {
  Data_CommonEvent,
  Data_NamedItem,
  Data_Troop,
  EventCommand,
} from "@sigureya/rpgtypes";
import type { ImageCommand, ImageCommandInfo } from "./eventCommand/";
import { extractImagesFromCommandList } from "./eventCommand/";
import type { ImageExtractableMap } from "./types";

export const extractImagesFromTroop = (troops: ReadonlyArray<Data_Troop>) => {
  return processTroopEvents(troops, collectImageCommands).flat(2);
};

export const extractImagesFromCommonEvents = (
  events: ReadonlyArray<Data_CommonEvent>
): ImageCommandInfo[] => {
  return processCommonEvents(events, collectImageCommands).flat(2);
};

export const extractTextFromMap = (
  map: ImageExtractableMap
): ImageCommandInfo[] => {
  return collectMapEvents(map, collectImageCommands);
};

export const collectImageCommands = (
  page: { list: EventCommand[] },
  pageIndex: number,
  event: Data_NamedItem
): ImageCommandInfo[] => {
  const list: ImageCommand[][] = extractImagesFromCommandList(
    page.list.filter(isImageCommand)
  );
  return list.flatMap((xx) => mapImageCommands(xx, pageIndex, event));
};

const imageCommandInfo = (
  command: ImageCommand,
  event: Data_NamedItem,
  pageIndex: number
): ImageCommandInfo => ({
  folderName: command.folderName,
  command: command.command,
  eventId: event.id,
  pageIndex: pageIndex,
  eventName: event.name,
});

const mapImageCommands = (
  list: ImageCommand[],
  pageIndex: number,
  event: Data_NamedItem
) => {
  return list.map((command) => imageCommandInfo(command, event, pageIndex));
};
