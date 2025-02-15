import { Data_CommonEvent, Data_Troop, EventCommand, MapEventContainer, MapEventPage } from '@sigureya/rpgtypes';
import { ExtractedVariableCommands } from './types';
export declare const collectVariableReadCommand: <Page extends {
    list: EventCommand[];
}>(page: Page, pageIndex: number, event: {
    id: number;
}) => ExtractedVariableCommands;
type EventPageType = Pick<MapEventPage, "conditions" | "list">;
type EventType = {
    id: number;
    pages: EventPageType[];
};
export declare const extractVariableReadingFromMap: (map: MapEventContainer<EventCommand, EventType>) => {
    page: ExtractedVariableCommands;
    conditions: import('./eventConditions').ExtractedPageCondition;
}[];
export declare const extractVariableReadingFromCommonEvent: (event: ReadonlyArray<Data_CommonEvent>) => ExtractedVariableCommands[];
export declare const extractVariableReadingFromTroop: (troops: ReadonlyArray<Data_Troop>) => ExtractedVariableCommands[][];
export {};
