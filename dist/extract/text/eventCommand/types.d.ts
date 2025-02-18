import { CommandParameter } from '@sigureya/rpg-data-tools';
export type TextCommandParameter = CommandParameter<string>;
export interface ExtractedEventText {
    eventId: number;
    pageIndex: number;
    commands: CommandParameter<string>[];
}
