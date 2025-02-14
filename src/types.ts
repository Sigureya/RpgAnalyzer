import type { CommandParameter } from "@sigureya/rpg-data-tools";

import type {
  VariableReference,
  AudioCommandInfo,
  ImageCommand,
  ExtractedPageCondition,
} from "./extract";

export interface ExtractedMapEventPage {
  commands: ExtractedCommandInfos;
}
export interface ExtractedCommandInfos {
  variableReading: VariableReference[];
  variableWriting: VariableReference[];
  calls: Record<number, number>;
  texts: CommandParameter<string>[];
  audios: AudioCommandInfo[];
  images: ImageCommand[];
}

export interface ExtractedMapEventPage {
  commands: ExtractedCommandInfos;
  condtion: ExtractedPageCondition;
}
