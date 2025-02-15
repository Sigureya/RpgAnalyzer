import { CommandParameter } from '@sigureya/rpg-data-tools';
import { Data_CommonEvent, Data_Troop, EventCommand, MapEvent } from '@sigureya/rpgtypes';
import { ExtractedCommonEventText, ExtractedTroopText } from './types';
import { ExtractedEventText } from './eventCommand/types';
export declare const correctTextCommands: (page: {
    list: EventCommand[];
}, pageIndex: number, event: {
    id: number;
}) => ExtractedEventText;
export declare const correctMapEventText: (event: Pick<MapEvent, "note" | "pages" | "id">) => {
    note: import('./mainData').ExtractedTextItem[];
    eventId: number;
    commands: CommandParameter<string>[];
};
export declare const extractTextFromTroop: (troop: Pick<Data_Troop, "pages" | "id">) => ExtractedTroopText;
export declare const extractTextFromCommonEvent: (event: Pick<Data_CommonEvent, "list" | "id">) => ExtractedCommonEventText;
