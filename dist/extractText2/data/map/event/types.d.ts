import { CommandParameter } from '@sigureya/rpg-data-tools';
import { ExtractedTextItem } from './mainData';
export interface ExtractedMapEventText {
    eventId: number;
    commands: CommandParameter<string>[];
    note: ExtractedTextItem[];
}
