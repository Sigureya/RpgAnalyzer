import type {
  VariableRead,
  AudioCommandInfo,
  ImageCommand,
  ExtractedPageCondition,
  ImageResourcePath,
  VariableWrite,
  TextCommandParameter,
} from "./extract";

export interface ExtractedCommandInfos {
  variableReading: VariableRead[];
  variableWriting: VariableWrite[];
  calls: Record<number, number>;
  texts: TextCommandParameter[];
  audios: AudioCommandInfo[];
  images: ImageCommand[];
}

export interface ExtractedMapEventPage {
  commands: ExtractedCommandInfos;
  condtion: ExtractedPageCondition;
  image: ImageResourcePath;
}

export interface ExtractedMapEvent {
  name: string;
  eventId: number;
  pages: ExtractedMapEventPage[];
}
