import type { EventCommand, MapEvent, MapEventPage } from "@sigureya/rpgtypes";

import {
  eventPageCharacterImage,
  extractAudioCommandsInfo,
  extractCommonEventCalls,
  extractImagesFromCommandList,
  extractPageCondition,
  extractTextFromEventCommands,
  extractVariableReadingInfos,
  extractVariableWriting,
} from "./extract";
import type {
  ExtractedCommandInfos,
  ExtractedMapEvent,
  ExtractedMapEventPage,
} from "./types";

export const extractMapEvent = (event: MapEvent): ExtractedMapEvent => {
  const pages = event.pages.map(extractPageInfo);
  return {
    name: event.name,
    eventId: event.id,
    pages,
  };
};

export const extractPageInfo = (page: MapEventPage): ExtractedMapEventPage => {
  return {
    commands: extractEventCommandData(page.list),
    condtion: extractPageCondition(page.conditions),
    image: eventPageCharacterImage(page.image),
  };
};

export const extractEventCommandData = (
  list: ReadonlyArray<EventCommand>
): ExtractedCommandInfos => {
  return {
    texts: extractTextFromEventCommands(list).flat(),
    calls: extractCommonEventCalls(list),
    audios: extractAudioCommandsInfo(list),
    variableReading: extractVariableReadingInfos(list),
    variableWriting: extractVariableWriting(list),
    images: extractImagesFromCommandList(list),
  };
};
