import type { EventCommand, MapEventPage } from "@sigureya/rpgtypes";

import {
  eventPageCharacterImage,
  extractAudioCommandsInfo,
  extractCommonEventCalls,
  extractImagesFromCommandList,
  extractTextFromEventCommands,
  extractVariableReadingInfos,
} from "./extract";
import type { ExtractedCommandInfos } from "./types";

export const extractPageInfo = (page: MapEventPage) => {
  return {
    commands: extractEventCommandData(page.list),
    condtion: {
      variableId: page.conditions.variableId,
      valid: page.conditions.variableValid,
      value: page.conditions.variableValue,
    },
    image: eventPageCharacterImage(page),
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
    variableWriting: [],
    images: extractImagesFromCommandList(list),
  };
};
