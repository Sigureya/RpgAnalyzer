import { CommandParameter } from '@sigureya/rpg-data-tools';
import { VariableReference, AudioCommandInfo, ImageCommand, ExtractedPageCondition, ImageResourcePath, ExtractedVariableWrite } from './extract';
export interface ExtractedCommandInfos {
    variableReading: VariableReference[];
    variableWriting: ExtractedVariableWrite[];
    calls: Record<number, number>;
    texts: CommandParameter<string>[];
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
