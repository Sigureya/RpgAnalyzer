import type {
  VariableRead,
  AudioCommandInfo,
  ImageCommand,
  ExtractedPageCondition,
  ImageResourcePath,
  VariableWrite,
  TextCommandParameter,
  CommonEventCallCount,
  AudioResourcePath,
} from "./extract";

export interface ExtractedCommandInfos {
  variableReading: VariableRead[];
  variableWriting: VariableWrite[];
  calls: CommonEventCallCount;
  texts: TextCommandParameter[];
  audios: AudioCommandInfo[];
  images: ImageCommand[];
}
export interface EventDomain {
  variables: number[];
  calls: number[];
  audios: AudioResourcePath[];
}

export type EventDomainScore = Record<keyof ExtractedCommandInfos, number>;

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
